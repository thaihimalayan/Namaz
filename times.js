/* Namaz - Prayer Times */
var Times = (function () {
  var cache = null, y = 0, m = 0, timer = 0;
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function init() {
    $('tAsr').value = S.settings.asr;
    $('tAsr').onchange = function () { S.settings.asr = +this.value; settingsChanged(); };
    var a = PR.ymd(new Date(), curCity().tz);
    y = a[0]; m = a[1];
    $('tmPrev').onclick = function () { m--; if (m < 1) { m = 12; y--; } renderMonth(); };
    $('tmNext').onclick = function () { m++; if (m > 12) { m = 1; y++; } renderMonth(); };
    refresh();
    if (!timer) { timer = setInterval(tick, 1000); }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) { renderToday(); } });
  }

  function refresh() {
    renderCityTabs();
    $('tAsr').value = S.settings.asr;
    renderToday();
    renderMonth();
  }

  function renderToday() {
    var c = curCity(), now = new Date();
    var greg = new Intl.DateTimeFormat('en-GB', {timeZone: c.tz, weekday: 'short', day: 'numeric', month: 'short'}).format(now);
    var hij = '';
    try { hij = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {timeZone: c.tz, day: 'numeric', month: 'short', year: 'numeric'}).format(now); } catch (e) {}
    $('topDate').innerHTML = esc(greg) + (hij ? '<br>' + esc(hij) : '');
    var t = PR.timesFor(now, c, S.settings);
    var tomorrow = PR.timesFor(new Date(now.getTime() + 86400000), c, S.settings);
    var friday = new Intl.DateTimeFormat('en-US', {timeZone: c.tz, weekday: 'long'}).format(now) === 'Friday';
    cache = {t: t, tomorrow: tomorrow};
    var h = '';
    PR.NAMES.forEach(function (n) {
      h += '<tr data-n="' + n + '"><td>' + n + (n === 'Dhuhr' && friday ? " <small>(Jumu'ah)</small>" : '') + '</td><td class="ar">' + PR.AR[n] +
           '</td><td class="tm">' + PR.fmt(t[n], c.tz, S.settings.h24) + '</td></tr>';
    });
    $('timesTbl').innerHTML = h;
    tick();
  }

  function tick() {
    if (!cache) { return; }
    var c = curCity(), now = new Date(), t = cache.t, nextName = null, next = null;
    for (var i = 0; i < PR.PRAYERS.length; i++) {
      var n = PR.PRAYERS[i];
      if (t[n] && t[n] > now) { nextName = n; next = t[n]; break; }
    }
    if (!next) { nextName = 'Fajr'; next = cache.tomorrow.Fajr; }
    var rows = $('timesTbl').querySelectorAll('tr');
    for (var r = 0; r < rows.length; r++) {
      var nm = rows[r].getAttribute('data-n');
      rows[r].className = (nm === nextName && t[nm] && t[nm] > now) ? 'active' : (t[nm] && t[nm] <= now ? 'past' : '');
    }
    if (!next) { $('nextName').textContent = '--'; return; }
    var s = Math.max(0, Math.floor((next - now) / 1000));
    $('nextName').textContent = nextName + '  ' + PR.AR[nextName];
    $('countdown').textContent = PR.p2(Math.floor(s / 3600)) + ':' + PR.p2(Math.floor(s % 3600 / 60)) + ':' + PR.p2(s % 60);
    $('nextAt').textContent = 'at ' + PR.fmt(next, c.tz, S.settings.h24) + ' · ' + c.name.split(',')[0];
    if (s === 0) { setTimeout(renderToday, 1100); }
  }

  function renderMonth() {
    var c = curCity();
    $('tmTitle').textContent = MONTHS[m - 1] + ' ' + y;
    var days = new Date(Date.UTC(y, m, 0)).getUTCDate(), todayKey = PR.today(c.tz);
    var h = '<tr><th>Day</th>';
    PR.NAMES.forEach(function (n) { h += '<th>' + n.replace('Sunrise', 'Sun').replace('Maghrib', 'Magh') + '</th>'; });
    h += '</tr>';
    for (var d = 1; d <= days; d++) {
      var t = PR.compute(y, m, d, c, S.settings), k = PR.key(y, m, d);
      var wd = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {weekday: 'short', timeZone: 'UTC'});
      h += '<tr class="' + (k === todayKey ? 'active' : (wd === 'Fri' ? 'fri' : '')) + '"><td>' + d + ' <small>' + wd + '</small></td>';
      PR.NAMES.forEach(function (n) { h += '<td class="tm">' + PR.fmt(t[n], c.tz, S.settings.h24) + '</td>'; });
      h += '</tr>';
    }
    $('tmTbl').innerHTML = h;
  }

  return {init: init, refresh: refresh};
})();
