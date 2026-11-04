/* Namaz - More: settings, backup, update */
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
    $('bkExport').onclick = exportBackup;
    $('bkRestore').onclick = restoreBackup;
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
  function exportBackup() {
    var json = JSON.stringify({app: 'namaz', made: new Date().toISOString(), state: S}, null, 1);
    $('bkText').value = json;
    try { navigator.clipboard.writeText(json).then(function () { toast('Backup text copied. Paste it into Notes to keep it.'); }, function () {}); } catch (e) {}
    var name = 'namaz-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    try {
      var file = new File([json], name, {type: 'application/json'});
      if (navigator.canShare && navigator.canShare({files: [file]})) {
        navigator.share({files: [file], title: 'Namaz backup'}).catch(function () {});
        return;
      }
    } catch (e) {}
    try {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([json], {type: 'application/json'}));
      a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
    } catch (e) {}
  }
  function applyBackup(text) {
    try {
      var d = JSON.parse(text), st = d.state;
      if (!st || !st.settings || !st.cities || !st.cities.length || !st.log) { throw 0; }
      S = st; save(); applyDark(); location.reload();
    } catch (e) { toast('This is not a Namaz backup.'); }
  }
  function restoreBackup() {
    var f = $('bkFile').files[0], txt = $('bkText').value.trim();
    if (!f && !txt) { toast('Choose a backup file or paste the backup text first.'); return; }
    tapConfirm($('bkRestore'), 'Tap again: replaces everything', function () {
      if (txt) { applyBackup(txt); return; }
      var rd = new FileReader();
      rd.onload = function () { applyBackup(rd.result); };
      rd.readAsText(f);
    });
  }

  /* ----- update ----- */
  function checkUpdate() {
    toast('Checking...');
    fetch('store.js?t=' + Date.now(), {cache: 'no-store'}).then(function (r) { return r.text(); }).then(function (t) {
      var m = /var APP_VER = (\d+)/.exec(t), v = m ? +m[1] : 0;
      if (v > APP_VER) {
        toast('Updating to version ' + v + '...');
        setTimeout(function () { location.replace(location.pathname + '?u=' + Date.now()); }, 700);
      } else {
        toast('Up to date. The server has version ' + v + ', this phone has version ' + APP_VER + '.');
      }
    }).catch(function () { toast('Cannot reach the PC. Check Wi-Fi.'); });
  }
  return {init: init, refresh: refresh};
})();
