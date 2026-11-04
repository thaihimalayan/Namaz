/* Namaz - data kept on the phone (localStorage), shared helpers */
var APP_VER = 26;   // bump together with VERSION in sw.js when you change files

var DEFAULT_CITIES = [
  {id: 1, name: 'Bangkok', lat: 13.7563, lng: 100.5018, tz: 'Asia/Bangkok'},
  {id: 2, name: 'Chanthaburi', lat: 12.6114, lng: 102.1039, tz: 'Asia/Bangkok'},
  {id: 3, name: 'Current location', lat: 13.7563, lng: 100.5018, tz: 'Asia/Bangkok', loc: false}   // filled from the phone's GPS
];

var S = null;   // the whole saved state: {settings, cities, log}
var KEY = 'namaz.v1';

function freshState() {
  return {settings: {city_id: 1, method: 'mwl', asr: 1, h24: 1, dark: 'auto', adj: {}}, cities: JSON.parse(JSON.stringify(DEFAULT_CITIES)), log: {}};
}
function loadState() {
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) { S = JSON.parse(raw); }
  } catch (e) { S = null; }
  if (!S || !S.settings || !S.cities || !S.cities.length || !S.log) { S = freshState(); }
  fixCities();
  // one-time: offline fallback tuned to Muslim Thai Post (19/18, Shafi Asr); site times come from online.js
  if (S.settings.preset !== 'mt1') {
    S.cities.forEach(function (c) { if (/^Bangkok/i.test(c.name)) { S.settings.city_id = c.id; } });
    S.settings.method = 'mtp'; S.settings.asr = 1;
    S.settings.adj = {Fajr: 1, Sunrise: 1, Dhuhr: 4, Asr: 2, Maghrib: 2, Isha: 2};
    S.settings.dm = 0;
    S.settings.preset = 'mt1';
    save();
  }
}
function fixCities() {   // the app has exactly three places: Bangkok, Chanthaburi, Current location
  var gps = null, selName = '';
  (S.cities || []).forEach(function (c) {
    if (c.loc) { gps = c; }
    if (c.id === S.settings.city_id) { selName = c.name; }
  });
  var fresh = JSON.parse(JSON.stringify(DEFAULT_CITIES));
  if (gps) { fresh[2] = {id: 3, name: 'Current location', lat: gps.lat, lng: gps.lng, tz: gps.tz, loc: true}; }
  S.cities = fresh;
  if (selName === 'Current location') { S.settings.city_id = 3; }
  else if (S.settings.city_id !== 1 && S.settings.city_id !== 2) { S.settings.city_id = 1; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { toast('Could not save on this phone (private mode?)'); }
}

function $(id) { return document.getElementById(id); }
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]; }); }
function curCity() {
  for (var i = 0; i < S.cities.length; i++) { if (S.cities[i].id === S.settings.city_id) { return S.cities[i]; } }
  S.settings.city_id = S.cities[0].id;
  return S.cities[0];
}
function fillSelect(sel, items, value) {
  sel.innerHTML = '';
  items.forEach(function (it) {
    var o = document.createElement('option');
    o.value = it[0]; o.textContent = it[1];
    sel.appendChild(o);
  });
  sel.value = value;
}
function cityOptions() { return S.cities.map(function (c) { return [c.id, c.name]; }); }
function renderCityTabs() {
  var boxes = document.querySelectorAll('.ctabs');
  for (var b = 0; b < boxes.length; b++) {
    var h = '';
    S.cities.forEach(function (c) {
      h += '<button data-c="' + c.id + '" class="' + (c.id === S.settings.city_id ? 'on' : '') + '">' + (c.id === 3 ? '&#128205; Current' : esc(c.name)) + '</button>';
    });
    boxes[b].innerHTML = h;
    var bs = boxes[b].querySelectorAll('button');
    for (var i = 0; i < bs.length; i++) { bs[i].onclick = function () { selectCity(+this.getAttribute('data-c')); }; }
  }
}
function selectCity(id) {
  if (id === 3) { useLocation(); return; }
  S.settings.city_id = id;
  settingsChanged();
}
function useLocation() {
  var c4 = S.cities[2];
  if (!navigator.geolocation) { toast('Location is not available on this phone.'); if (c4.loc) { S.settings.city_id = 3; settingsChanged(); } return; }
  toast('Finding your location...');
  navigator.geolocation.getCurrentPosition(function (p) {
    c4.lat = +p.coords.latitude.toFixed(4); c4.lng = +p.coords.longitude.toFixed(4); c4.loc = true;
    try { c4.tz = Intl.DateTimeFormat().resolvedOptions().timeZone || c4.tz; } catch (e) {}
    S.settings.city_id = 3;
    settingsChanged();
    toast('Using your current location');
  }, function () {
    if (c4.loc) { S.settings.city_id = 3; settingsChanged(); toast('Could not update GPS. Using the last known location.'); }
    else { toast('Location is blocked here. Type your coordinates in More > General.'); }
  }, {timeout: 15000, maximumAge: 600000});
}
function methodOptions() {
  var a = [];
  for (var k in PR.METHODS) { a.push([k, PR.METHODS[k].name]); }
  return a;
}

var toastTimer = 0;
function toast(msg) {
  var t = $('toast');
  if (!t) { return; }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3000);
}

/* a change of city / method / asr anywhere refreshes every page */
function settingsChanged() {
  save();
  renderCityTabs();
  if (window.Times) { Times.refresh(); }
  if (window.Tracker) { Tracker.refresh(); }
  if (window.Qibla) { Qibla.refresh(); }
  if (window.More) { More.refresh(); }
}

function applyDark() {
  var d = S.settings.dark, on = d === '1' || d === 1 ||
    (d === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  var r = document.documentElement;
  if (d === 'auto' || d === undefined) { r.removeAttribute('data-theme'); } else { r.setAttribute('data-theme', on ? 'dark' : 'light'); }
}

/* two-tap confirmation (browsers inside other apps often block confirm()) */
function tapConfirm(btn, label, action) {
  if (btn.getAttribute('data-armed')) { btn.removeAttribute('data-armed'); btn.classList.remove('armed'); btn.textContent = btn.getAttribute('data-label'); action(); return; }
  btn.setAttribute('data-label', btn.textContent);
  btn.setAttribute('data-armed', '1'); btn.classList.add('armed'); btn.textContent = label;
  setTimeout(function () {
    if (btn.getAttribute('data-armed')) { btn.removeAttribute('data-armed'); btn.classList.remove('armed'); btn.textContent = btn.getAttribute('data-label'); }
  }, 4000);
}
