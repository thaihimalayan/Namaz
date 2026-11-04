/* Namaz - live times for Bangkok and Chanthaburi from Aladhan (method 18), the same source as Masjid Darul Aman. Kept on the phone for offline use. */
var Online = (function () {
  var OKEY = 'namaz.online.v1', M = 18;
  var PLACES = {1: {lat: 13.7525, lng: 100.5283}, 2: {lat: 12.6114, lng: 102.1039}};   // Bangkok (masjid's point), Chanthaburi
  var data = {}, busy = {};
  try { data = JSON.parse(localStorage.getItem(OKEY) || '{}') || {}; } catch (e) { data = {}; }

  function saveData() { try { localStorage.setItem(OKEY, JSON.stringify(data)); } catch (e) {} }
  function mk(y, m) { return y + '-' + PR.p2(m); }
  function toDate(y, mo, d, str) {   // "05:00 (+07)" -> Date (Thailand is UTC+7 all year)
    var mm = /(\d+):(\d+)/.exec(str || '');
    return mm ? new Date(Date.UTC(y, mo - 1, d, +mm[1] - 7, +mm[2])) : null;
  }
  // times for one day, or null when not downloaded yet
  function get(cityId, y, m, d) {
    var cm = data[cityId] && data[cityId][mk(y, m)];
    var day = cm && cm[d];
    if (!day) { return null; }
    var out = {};
    PR.NAMES.forEach(function (n) { out[n] = toDate(y, m, d, day[n]); });
    return out;
  }
  function has(cityId, y, m) { return !!(data[cityId] && data[cityId][mk(y, m)]); }

  function load(cityId, y, m, done) {
    var p = PLACES[cityId], k = cityId + mk(y, m);
    if (!p || busy[k] || typeof fetch !== 'function') { if (done) { done(false); } return; }
    busy[k] = 1;
    fetch('https://api.aladhan.com/v1/calendar/' + y + '/' + m + '?latitude=' + p.lat + '&longitude=' + p.lng + '&method=' + M)
      .then(function (r) { if (!r.ok) { throw 0; } return r.json(); })
      .then(function (j) {
        var cm = {};
        j.data.forEach(function (e, i) {
          var t = e.timings, o = {};
          PR.NAMES.forEach(function (n) { o[n] = t[n]; });
          cm[i + 1] = o;
        });
        if (!data[cityId]) { data[cityId] = {}; }
        data[cityId][mk(y, m)] = cm;
        saveData();
        busy[k] = 0;
        if (done) { done(true); }
      })
      .catch(function () { busy[k] = 0; if (done) { done(false); } });
  }

  // make sure this month and next month are saved for both cities
  function sync() {
    var a = PR.ymd(new Date(), 'Asia/Bangkok'), y = a[0], m = a[1];
    var ny = m === 12 ? y + 1 : y, nm = m === 12 ? 1 : m + 1, any = false;
    [1, 2].forEach(function (id) {
      [[y, m], [ny, nm]].forEach(function (ym) {
        if (!has(id, ym[0], ym[1]) || (ym[0] === y && ym[1] === m && stale())) {
          load(id, ym[0], ym[1], function (ok) { if (ok && window.settingsChanged) { settingsChanged(); } });
        }
      });
    });
    function stale() { var t = +localStorage.getItem(OKEY + '.t') || 0; return Date.now() - t > 86400000; }
    try { if (!busy.stamp) { localStorage.setItem(OKEY + '.t', String(Date.now())); } } catch (e) {}
  }
  function init() {
    sync();
    document.addEventListener('visibilitychange', function () { if (!document.hidden) { sync(); } });
  }
  function usable(cityId, y, m) { return has(cityId, y, m); }
  return {init: init, get: get, usable: usable, sync: sync};
})();
