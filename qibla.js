/* Namaz - Qibla */
var Qibla = (function () {
  var deg = 0, heading = 0, live = false;

  function init() {
    $('compassBtn').onclick = startCompass;
    refresh();
  }
  function refresh() {
    renderCityTabs();
    var c = curCity();
    deg = PR.bearing(c.lat, c.lng);
    $('qDeg').textContent = deg.toFixed(1) + '° from North';
    $('qCity').textContent = c.name + ' · ' + Math.round(PR.distanceKm(c.lat, c.lng)).toLocaleString() + ' km to the Kaaba';
    rotate();
  }
  function rotate() { $('needle').style.transform = 'rotate(' + PR.fix(deg - (live ? heading : 0), 360) + 'deg)'; }

  function startCompass() {
    var hint = $('qHint');
    if (window.isSecureContext === false) {
      hint.textContent = 'The iPhone only allows the live compass on a secure (https) address. This address is http, so use the angle shown above: face North, then turn that many degrees clockwise.';
      return;
    }
    function go() {
      var got = false;
      var h = function (e) {
        var a = e.webkitCompassHeading != null ? e.webkitCompassHeading : (e.alpha != null ? 360 - e.alpha : null);
        if (a == null) { return; }
        got = true; heading = a; live = true; rotate();
        hint.textContent = 'Live compass on: keep the phone flat. The Kaaba symbol points towards Mecca.';
        $('compassBtn').style.display = 'none';
      };
      window.addEventListener('deviceorientationabsolute', h, true);
      window.addEventListener('deviceorientation', h, true);
      setTimeout(function () {
        if (!got) { hint.textContent = 'No compass readings from this phone. Use the angle shown above: face North, then turn that many degrees clockwise.'; }
      }, 2500);
    }
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
        DeviceOrientationEvent.requestPermission().then(function (r) {
          if (r === 'granted') { go(); } else { hint.textContent = 'Compass permission was not given. Use the angle shown above.'; }
        }).catch(function () { hint.textContent = 'Compass not allowed here. Use the angle shown above.'; });
      } else { go(); }
    } catch (e) { hint.textContent = 'Compass not available. Use the angle shown above.'; }
  }
  return {init: init, refresh: refresh};
})();
