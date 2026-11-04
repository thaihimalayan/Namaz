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
  }
  return {init: init};
})();
