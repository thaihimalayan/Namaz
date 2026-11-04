/* Namaz - times copied from prayertimes.muslimthaipost.com (a GitHub job saves them into mtp.json every day).
   Bangkok and Chanthaburi use their own province; Current location uses the nearest province, like the website. */
var Online = (function () {
  var OKEY = 'namaz.mtp.v1', data = null;
  var PID = {1: '2', 2: '7'};   // site province numbers: Bangkok = 2, Chanthaburi = 7
  try { data = JSON.parse(localStorage.getItem(OKEY) || 'null'); } catch (e) { data = null; }

  function hav(la1, lo1, la2, lo2) {
    var r = Math.PI / 180, a = Math.sin((la2 - la1) * r / 2), b = Math.sin((lo2 - lo1) * r / 2);
    var h = a * a + Math.cos(la1 * r) * Math.cos(la2 * r) * b * b;
    return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }
  function provinceFor(city) {
    if (PID[city.id]) { return PID[city.id]; }
    if (!data || !data.prov) { return null; }
    var best = null, min = 1e9;
    for (var k in data.prov) {
      var p = data.prov[k], d = hav(city.lat, city.lng, p.lat, p.lng);
      if (d < min) { min = d; best = k; }
    }
    return min < 300 ? best : null;   // outside Thailand: use the phone's own calculation
  }
  // times for one day as Dates, or null when the site data does not cover that day
  function get(city, y, m, d) {
    if (!data || !data.d) { return null; }
    var pid = provinceFor(city), row = pid && data.d[pid] && data.d[pid][PR.key(y, m, d)];
    if (!row) { return null; }
    var p = row.split(' '), out = {};
    PR.NAMES.forEach(function (n, i) {
      var mm = /(\d+):(\d+)/.exec(p[i] || '');
      out[n] = mm ? new Date(Date.UTC(y, m - 1, d, +mm[1] - 7, +mm[2])) : null;   // Thailand = UTC+7
    });
    return out;
  }
  function has(city) {
    var a = PR.ymd(new Date(), 'Asia/Bangkok');
    return !!get(city, a[0], a[1], a[2]);
  }
  function load() {
    if (typeof fetch !== 'function') { return; }
    fetch('mtp.json?t=' + Date.now(), {cache: 'no-store'})
      .then(function (r) { if (!r.ok) { throw 0; } return r.text(); })
      .then(function (t) {
        var j = JSON.parse(t);
        if (!j || !j.d) { throw 0; }
        data = j;
        try { localStorage.setItem(OKEY, t); } catch (e) {}
        if (window.settingsChanged) { settingsChanged(); }
      })
      .catch(function () {});
  }
  function init() {
    load();
    document.addEventListener('visibilitychange', function () { if (!document.hidden) { load(); } });
  }
  return {init: init, get: get, has: has, updated: function () { return data && data.updated || ''; }};
})();
