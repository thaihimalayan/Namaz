/* Namaz - prayer time and Qibla maths (runs in the browser, works offline) */
var PR = (function () {
  var rad = function (d) { return d * Math.PI / 180; };
  var deg = function (r) { return r * 180 / Math.PI; };
  function fix(a, b) { return a - b * Math.floor(a / b); }
  function p2(n) { return (n < 10 ? '0' : '') + n; }

  // f = Fajr angle, i = Isha angle, im = fixed minutes after Maghrib (used when i is 0)
  var METHODS = {
    mwl:     {name: 'Muslim World League', f: 18, i: 17, im: 0},
    karachi: {name: 'Univ. of Islamic Sciences, Karachi', f: 18, i: 18, im: 0},
    egypt:   {name: 'Egyptian General Authority', f: 19.5, i: 17.5, im: 0},
    isna:    {name: 'ISNA (North America)', f: 15, i: 15, im: 0},
    makkah:  {name: 'Umm al-Qura (Makkah)', f: 18.5, i: 0, im: 90},
    jakim:   {name: 'Singapore / Malaysia (JAKIM)', f: 20, i: 18, im: 0}
  };
  var NAMES = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  var PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  var AR = {Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء'};
  var KAABA = [21.4225, 39.8262];

  function sunPos(D) {
    var g = fix(357.529 + 0.98560028 * D, 360), q = fix(280.459 + 0.98564736 * D, 360);
    var L = fix(q + 1.915 * Math.sin(rad(g)) + 0.02 * Math.sin(rad(2 * g)), 360);
    var e = 23.439 - 0.00000036 * D;
    var RA = fix(deg(Math.atan2(Math.cos(rad(e)) * Math.sin(rad(L)), Math.cos(rad(L)))) / 15, 24);
    return {decl: deg(Math.asin(Math.sin(rad(e)) * Math.sin(rad(L)))), eqt: fix(q / 15 - RA + 12, 24) - 12};
  }

  // [year, month, day] of a moment as seen in a time zone
  function ymd(date, tz) {
    var parts = new Intl.DateTimeFormat('en-CA', {timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(date);
    var o = {};
    parts.forEach(function (x) { o[x.type] = x.value; });
    return [+o.year, +o.month, +o.day];
  }
  function key(y, m, d) { return y + '-' + p2(m) + '-' + p2(d); }
  function today(tz) { var a = ymd(new Date(), tz); return key(a[0], a[1], a[2]); }

  // prayer times for local date y-m-d at a city. Returns {Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha} as Date (or null when the sun never gets there)
  function compute(y, m, d, city, st) {
    if (window.Online && (city.id === 1 || city.id === 2)) {   // live masjid times (Aladhan method 18) when downloaded
      var live = Online.get(city.id, y, m, d);
      if (live) { return live; }
    }
    var meth = METHODS[st.method] || METHODS.mwl;
    var asrF = +st.asr === 2 ? 2 : 1;
    var lat = city.lat, lng = city.lng;
    var base = Date.UTC(y, m - 1, d);
    var J = (base + 12 * 3600000) / 86400000 + 2440587.5 - 2451545.0;
    var sp = sunPos(J), decl = sp.decl, noon = 12 - lng / 15 - sp.eqt;
    function T(a) {   // hours between solar noon and the sun being a degrees below the horizon
      var c = (-Math.sin(rad(a)) - Math.sin(rad(decl)) * Math.sin(rad(lat))) / (Math.cos(rad(decl)) * Math.cos(rad(lat)));
      return (c < -1 || c > 1) ? NaN : deg(Math.acos(c)) / 15;
    }
    var asrAlt = deg(Math.atan(1 / (asrF + Math.tan(rad(Math.abs(lat - decl))))));
    var ca = (Math.sin(rad(asrAlt)) - Math.sin(rad(decl)) * Math.sin(rad(lat))) / (Math.cos(rad(decl)) * Math.cos(rad(lat)));
    var asrT = (ca < -1 || ca > 1) ? NaN : deg(Math.acos(ca)) / 15;
    var sunT = T(0.833), mag = noon + sunT;
    var t = {
      Fajr: noon - T(meth.f),
      Sunrise: noon - sunT,
      Dhuhr: noon + (st.dm === undefined ? 2 : +st.dm) / 60,   // minutes after the sun passes its highest point
      Asr: noon + asrT,
      Maghrib: mag,
      Isha: meth.i > 0 ? noon + T(meth.i) : mag + meth.im / 60
    };
    var adj = st.adj || {}, out = {};
    NAMES.forEach(function (n) {
      out[n] = isNaN(t[n]) ? null : new Date(base + t[n] * 3600000 + (+adj[n] || 0) * 60000);
    });
    return out;
  }
  function timesFor(date, city, st) {
    var a = ymd(date, city.tz);
    return compute(a[0], a[1], a[2], city, st);
  }

  function fmt(date, tz, h24) {
    if (!date) { return '--:--'; }
    return new Intl.DateTimeFormat('en-GB', {timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: !h24}).format(date);
  }

  function bearing(lat, lng) {
    var p1 = rad(lat), p2_ = rad(KAABA[0]), dl = rad(KAABA[1] - lng);
    var y = Math.sin(dl) * Math.cos(p2_), x = Math.cos(p1) * Math.sin(p2_) - Math.sin(p1) * Math.cos(p2_) * Math.cos(dl);
    return fix(deg(Math.atan2(y, x)), 360);
  }
  function distanceKm(lat, lng) {
    var p1 = rad(lat), p2_ = rad(KAABA[0]), dp = p2_ - p1, dl = rad(KAABA[1] - lng);
    var a = Math.sin(dp / 2) * Math.sin(dp / 2) + Math.cos(p1) * Math.cos(p2_) * Math.sin(dl / 2) * Math.sin(dl / 2);
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  return {METHODS: METHODS, NAMES: NAMES, PRAYERS: PRAYERS, AR: AR, ymd: ymd, key: key, today: today, p2: p2,
          compute: compute, timesFor: timesFor, fmt: fmt, bearing: bearing, distanceKm: distanceKm, fix: fix};
})();
