/* Namaz - Guide (static text: edit the lists below to change it) */
var Guide = (function () {
  var RAKAT = {
    Fajr: [['Sunnah', '2'], ['Fard', '2']],
    Dhuhr: [['Sunnah', '4'], ['Fard', '4'], ['Sunnah', '2'], ['Nafl', '2']],
    Asr: [['Sunnah (optional)', '4'], ['Fard', '4']],
    Maghrib: [['Fard', '3'], ['Sunnah', '2'], ['Nafl', '2']],
    Isha: [['Sunnah (optional)', '4'], ['Fard', '4'], ['Sunnah', '2'], ['Nafl', '2'], ['Witr', '3']]
  };
  var STEPS = [
    ['Niyyah', 'Be in wudu, face the Qibla and make the intention in your heart for the prayer you are offering.'],
    ['Takbir', 'Raise your hands to your ears and say <em>Allahu Akbar</em>. Fold your hands.'],
    ['Qiyam (standing)', 'Recite <em>Thana</em>, <em>Ta\'awwudh</em>, <em>Bismillah</em>, Surah Al-Fatiha, then another surah (first two rakats).'],
    ['Ruku (bowing)', 'Say <em>Allahu Akbar</em>, bow with a straight back and say <em>Subhana Rabbiyal Azeem</em> three times.'],
    ['Qawmah (rising)', 'Rise saying <em>Sami\'Allahu liman hamidah</em>, stand and say <em>Rabbana lakal hamd</em>.'],
    ['Sujud (1st prostration)', 'Say <em>Allahu Akbar</em> and go down: forehead, nose, palms, knees and toes on the ground. Say <em>Subhana Rabbiyal A\'la</em> three times.'],
    ['Jalsa (sitting)', 'Rise saying <em>Allahu Akbar</em> and sit briefly.'],
    ['Sujud (2nd prostration)', 'Repeat the prostration. Then stand for the next rakat, or sit if it is the last one.'],
    ['Tashahhud', 'After the 2nd rakat, and again at the end of the prayer, sit and recite <em>At-Tahiyyat</em>.'],
    ['Durood and Dua', 'In the final sitting recite <em>Durood Ibrahim</em> and a dua such as <em>Rabbana atina fid-dunya hasanah...</em>'],
    ['Salam', 'Turn your head to the right then to the left saying <em>Assalamu alaykum wa rahmatullah</em>.']
  ];
  var WUDU = [
    ['Niyyah and Bismillah', 'Make the intention and say <em>Bismillah</em>.'],
    ['Hands', 'Wash both hands up to the wrists three times.'],
    ['Mouth', 'Rinse the mouth three times.'],
    ['Nose', 'Sniff water into the nose and blow it out, three times.'],
    ['Face', 'Wash the whole face three times, from hairline to chin and ear to ear.'],
    ['Arms', 'Wash the right arm then the left arm up to and including the elbows, three times each.'],
    ['Head', 'Wipe over the head once with wet hands.'],
    ['Ears', 'Wipe the inside and back of the ears with the wet fingers.'],
    ['Feet', 'Wash the right foot then the left foot up to and including the ankles, three times each.']
  ];

  function stepsHtml(list) {
    return list.map(function (s, i) {
      return '<div class="step"><div class="num">' + (i + 1) + '</div><div><b>' + s[0] + '</b><p>' + s[1] + '</p></div></div>';
    }).join('');
  }
  function init() {
    $('p-guide-steps').innerHTML = '<div class="card">' + stepsHtml(STEPS) +
      '<p class="note">Rakat 1 and 2: Fatiha plus a surah. Rakat 3 and 4 of a fard prayer: Fatiha only. Sit for Tashahhud after the 2nd rakat and at the end.</p></div>';
    $('p-guide-wudu').innerHTML = '<div class="card">' + stepsHtml(WUDU) + '</div>';
    var h = '';
    PR.PRAYERS.forEach(function (p) {
      h += '<div class="card"><h3>' + p + ' <span class="ar">' + PR.AR[p] + '</span></h3>';
      RAKAT[p].forEach(function (r) { h += '<div class="rk"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>'; });
      h += '</div>';
    });
    h += '<p class="note">Counts follow the common (Hanafi) practice and may differ slightly by school. On Friday the Jumu\'ah prayer (2 fard rakats with the khutbah) replaces the Dhuhr fard.</p>';
    $('p-guide-rakats').innerHTML = h;
    initTasbih();
  }

  /* digital tasbih */
  var DHIKR = [['SubhanAllah', 33], ['Alhamdulillah', 33], ['Allahu Akbar', 34], ['La ilaha illallah', 100], ['Astaghfirullah', 100], ['Free count (no target)', 0]];
  function tsb() {
    if (!S.tasbih) { S.tasbih = {mode: 0, n: 0, rounds: 0}; }
    return S.tasbih;
  }
  function initTasbih() {
    var opts = DHIKR.map(function (d, i) { return '<option value="' + i + '">' + d[0] + (d[1] ? ' (' + d[1] + ')' : '') + '</option>'; }).join('');
    $('p-guide-tasbih').innerHTML =
      '<div class="card center tsb">' +
      '<label class="tsbsel">Dhikr <select id="tsbMode">' + opts + '</select></label>' +
      '<div class="tsbname" id="tsbName"></div>' +
      '<button class="tsbbtn" id="tsbTap" aria-label="Count"><span id="tsbN">0</span><small id="tsbOf"></small></button>' +
      '<div class="note" id="tsbRounds"></div>' +
      '<button class="btn" id="tsbReset">Reset</button>' +
      '</div>' +
      '<p class="note">Tap the big circle for each dhikr. The phone buzzes when a round is complete. Your count is saved on this phone.</p>';
    $('tsbMode').value = tsb().mode;
    $('tsbMode').onchange = function () { tsb().mode = +this.value; tsb().n = 0; tsb().rounds = 0; save(); drawTasbih(); };
    $('tsbTap').onclick = tapTasbih;
    $('tsbReset').onclick = function () { var b = this; tapConfirm(b, 'Tap again to reset', function () { tsb().n = 0; tsb().rounds = 0; save(); drawTasbih(); }); };
    drawTasbih();
  }
  function buzz(p) { try { if (navigator.vibrate) { navigator.vibrate(p); } } catch (e) {} }
  function tapTasbih() {
    var t = tsb(), target = DHIKR[t.mode][1];
    if (target && t.n >= target) { t.n = 0; }
    t.n++;
    if (target && t.n === target) { t.rounds++; buzz([70, 50, 70]); toast('Round complete'); } else { buzz(12); }
    save(); drawTasbih();
  }
  function drawTasbih() {
    var t = tsb(), d = DHIKR[t.mode] || DHIKR[0], target = d[1];
    $('tsbName').textContent = d[0];
    $('tsbN').textContent = t.n;
    $('tsbOf').textContent = target ? 'of ' + target : 'taps';
    var pct = target ? Math.min(100, Math.round(t.n * 100 / target)) : 0;
    $('tsbTap').style.setProperty('--p', pct + '%');
    $('tsbRounds').textContent = target ? ('Rounds completed: ' + t.rounds) : 'Free count';
  }
  return {init: init};
})();
