/* Namaz - More: settings and update */
var More = (function () {

  function init() {
    $('verLbl').textContent = 'Version ' + APP_VER;

    $('gSave').onclick = function () {
      S.settings.method = $('gMethod').value;
      S.settings.asr = +$('gAsr').value;
      S.settings.h24 = +$('gH24').value;
      S.settings.dark = $('gDark').value;
      var adj = {};
      PR.NAMES.forEach(function (n) { adj[n] = Math.max(-90, Math.min(90, parseInt($('adj_' + n).value, 10) || 0)); });
      S.settings.adj = adj;
      // typed coordinates for "Current location"
      var lat = parseFloat($('gLat').value), lng = parseFloat($('gLng').value), c4 = S.cities[2];
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && (lat !== c4.lat || lng !== c4.lng)) {
        c4.lat = lat; c4.lng = lng; c4.loc = true;
      }
      applyDark();
      settingsChanged();
      toast('Saved');
    };
    $('gPreset').onclick = function () {
      S.settings.city_id = 1;
      S.settings.method = 'mtp'; S.settings.asr = 1;
      S.settings.adj = {Fajr: 1, Sunrise: 1, Dhuhr: 4, Asr: 2, Maghrib: 2, Isha: 2}; S.settings.dm = 0;
      settingsChanged(); toast('Reset offline backup settings');
    };
    $('updBtn').onclick = checkUpdate;
    refresh();
  }

  function refresh() {
    renderCityTabs();
    fillSelect($('gMethod'), methodOptions(), S.settings.method);
    $('gAsr').value = S.settings.asr;
    $('gH24').value = S.settings.h24;
    $('gDark').value = S.settings.dark === undefined ? 'auto' : String(S.settings.dark);
    $('gLat').value = S.cities[2].lat;
    $('gLng').value = S.cities[2].lng;
    var g = '';
    PR.NAMES.forEach(function (n) {
      g += '<label>' + n + ' <input type="text" inputmode="numeric" id="adj_' + n + '" value="' + (+(S.settings.adj || {})[n] || 0) + '"></label>';
    });
    $('adjGrid').innerHTML = g;
  }

  /* ----- backup ----- */
  /* ----- update ----- */
  function checkUpdate() {
    var msg = $('updMsg');
    msg.textContent = 'Checking...';
    fetch('store.js?t=' + Date.now(), {cache: 'no-store'}).then(function (r) { return r.text(); }).then(function (t) {
      var m = /var APP_VER = (\d+)/.exec(t), v = m ? +m[1] : 0;
      if (v > APP_VER) {
        msg.textContent = 'Updating to version ' + v + '...';
        try { if (navigator.serviceWorker) { navigator.serviceWorker.getRegistration().then(function (r) { if (r) { r.update(); } }); } } catch (e) {}
        setTimeout(function () { location.replace(location.pathname + '?u=' + Date.now()); }, 800);
      } else {
        msg.textContent = 'You are up to date (version ' + APP_VER + ').';
      }
    }).catch(function () { msg.textContent = 'Cannot reach the server. Check your internet.'; });
  }
  return {init: init, refresh: refresh};
})();
