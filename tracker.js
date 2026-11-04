/* Namaz - Tracker */
var Tracker = (function () {
  var y = 0, m = 0, today = '';
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function dayAdd(key, n) {
    var p = key.split('-'), d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + n));
    return PR.key(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
  }
  function done(key) { return S.log[key] || []; }

  function init() {
    $('kmPrev').onclick = function () { m--; if (m < 1) { m = 12; y--; } renderMonth(); };
    $('kmNext').onclick = function () { m++; if (m > 12) { m = 1; y++; } renderMonth(); };
    var a = PR.ymd(new Date(), curCity().tz);
    y = a[0]; m = a[1];
    refresh();
    document.addEventListener('visibilitychange', function () { if (!document.hidden) { refresh(); } });
  }
  function refresh() {
    today = PR.today(curCity().tz);
    renderToday();
    renderMonth();
  }

  function toggle(day, prayer) {
    var list = done(day).slice(), i = list.indexOf(prayer);
    if (i < 0) { list.push(prayer); } else { list.splice(i, 1); }
    if (list.length) { S.log[day] = list; } else { delete S.log[day]; }
    save();
    renderToday(); renderMonth();
  }
  function bind(root) {
    var bs = root.querySelectorAll('.box');
    for (var i = 0; i < bs.length; i++) {
      bs[i].onclick = function () { toggle(this.getAttribute('data-d'), this.getAttribute('data-p')); };
    }
  }

  function renderToday() {
    var c = curCity(), t = PR.timesFor(new Date(), c, S.settings), d = done(today), h = '';
    PR.PRAYERS.forEach(function (p) {
      var on = d.indexOf(p) >= 0;
      h += '<div class="prow"><span>' + p + ' <span class="ar">' + PR.AR[p] + '</span> <small>' + PR.fmt(t[p], c.tz, S.settings.h24) + '</small></span>' +
           '<button class="box' + (on ? ' on' : '') + '" data-d="' + today + '" data-p="' + p + '">' + (on ? '✓' : '') + '</button></div>';
    });
    $('kList').innerHTML = h;
    $('kCount').textContent = d.length + '/5';
    $('kBar').style.width = (d.length * 20) + '%';
    bind($('kList'));

    var w = '';
    for (var i = 6; i >= 0; i--) {
      var k = dayAdd(today, -i), n = done(k).length;
      var wd = new Date(Date.UTC(+k.slice(0, 4), +k.slice(5, 7) - 1, +k.slice(8, 10))).toLocaleDateString('en-GB', {weekday: 'short', timeZone: 'UTC'});
      w += '<div class="day"><div class="dot' + (n === 5 ? ' full' : '') + '">' + n + '</div>' + wd + '</div>';
    }
    $('week').innerHTML = w;

    var streak = 0, k2 = done(today).length === 5 ? today : dayAdd(today, -1), total = 0, full = 0;
    while (done(k2).length === 5) { streak++; k2 = dayAdd(k2, -1); }
    for (var key in S.log) { total += S.log[key].length; if (S.log[key].length === 5) { full++; } }
    $('streak').textContent = streak ? streak + '-day streak of all five prayers' : 'Complete all five prayers to start a streak.';
    $('totals').textContent = total + ' prayers logged · ' + full + ' full days';
  }

  function renderMonth() {
    $('kmTitle').textContent = MONTHS[m - 1] + ' ' + y;
    var days = new Date(Date.UTC(y, m, 0)).getUTCDate();
    var h = '<tr><th>Day</th>';
    PR.PRAYERS.forEach(function (p) { h += '<th>' + p.slice(0, 3) + '</th>'; });
    h += '<th></th></tr>';
    for (var d = 1; d <= days; d++) {
      var k = PR.key(y, m, d), dn = done(k), future = k > today;
      var wd = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {weekday: 'short', timeZone: 'UTC'});
      h += '<tr class="' + (k === today ? 'active' : '') + '"><td>' + d + ' <small>' + wd + '</small></td>';
      PR.PRAYERS.forEach(function (p) {
        var on = dn.indexOf(p) >= 0;
        h += '<td>' + (future ? '' : '<button class="box sm' + (on ? ' on' : '') + '" data-d="' + k + '" data-p="' + p + '">' + (on ? '✓' : '') + '</button>') + '</td>';
      });
      h += '<td class="tm">' + (future ? '' : dn.length + '/5') + '</td></tr>';
    }
    $('kmTbl').innerHTML = h;
    bind($('kmTbl'));
  }

  return {init: init, refresh: refresh};
})();
