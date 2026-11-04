/* Namaz - Surah: the last 10 surahs of the Quran with Arabic, transliteration, translation and audio (audio needs internet) */
var Surah = (function () {
  var BISMI = {a: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', t: 'Bismillahir-rahmanir-rahim.', e: 'In the name of Allah, the Most Gracious, the Most Merciful.'};
  var DATA = [{"n": 105, "ar": "الفيل", "en": "Al-Fil", "mean": "The Elephant", "v": [{"a": "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", "t": "Alam tara kayfa fa'ala rabbuka bi-ashabil-fil.", "e": "Have you not seen how your Lord dealt with the companions of the elephant?"}, {"a": "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", "t": "Alam yaj'al kaydahum fi tadlil.", "e": "Did He not make their plan go astray?"}, {"a": "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", "t": "Wa arsala 'alayhim tayran ababil.", "e": "And He sent against them flocks of birds,"}, {"a": "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ", "t": "Tarmihim bi-hijaratim-min sijjil.", "e": "striking them with stones of baked clay,"}, {"a": "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ", "t": "Fa ja'alahum ka'asfim-ma'kul.", "e": "and left them like eaten-up straw."}]}, {"n": 106, "ar": "قريش", "en": "Quraysh", "mean": "Quraysh", "v": [{"a": "لِإِيلَافِ قُرَيْشٍ", "t": "Li-ilafi Quraysh.", "e": "For the security of Quraysh,"}, {"a": "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", "t": "Ilafihim rihlatash-shita'i was-sayf.", "e": "their security during the winter and summer journeys,"}, {"a": "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ", "t": "Falya'budu rabba hadhal-bayt.", "e": "let them worship the Lord of this House,"}, {"a": "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ", "t": "Alladhi at'amahum min ju'in wa amanahum min khawf.", "e": "who fed them against hunger and made them safe from fear."}]}, {"n": 107, "ar": "الماعون", "en": "Al-Ma'un", "mean": "Small Kindnesses", "v": [{"a": "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", "t": "Ara'aytal-ladhi yukadhdhibu bid-din.", "e": "Have you seen the one who denies the Judgment?"}, {"a": "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", "t": "Fadhalikal-ladhi yadu'ul-yatim.", "e": "That is the one who pushes the orphan away,"}, {"a": "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", "t": "Wa la yahuddu 'ala ta'amil-miskin.", "e": "and does not urge the feeding of the poor."}, {"a": "فَوَيْلٌ لِّلْمُصَلِّينَ", "t": "Fawaylul lil-musallin.", "e": "So woe to those who pray,"}, {"a": "الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ", "t": "Alladhina hum 'an salatihim sahun.", "e": "who are heedless of their prayer,"}, {"a": "الَّذِينَ هُمْ يُرَاءُونَ", "t": "Alladhina hum yura'un.", "e": "who only want to be seen,"}, {"a": "وَيَمْنَعُونَ الْمَاعُونَ", "t": "Wa yamna'unal-ma'un.", "e": "and who refuse small acts of kindness."}]}, {"n": 108, "ar": "الكوثر", "en": "Al-Kawthar", "mean": "The Abundance", "v": [{"a": "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "t": "Inna a'taynakal-kawthar.", "e": "Indeed, We have given you al-Kawthar."}, {"a": "فَصَلِّ لِرَبِّكَ وَانْحَرْ", "t": "Fasalli li-rabbika wanhar.", "e": "So pray to your Lord and sacrifice."}, {"a": "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", "t": "Inna shani'aka huwal-abtar.", "e": "Indeed, the one who hates you is the one cut off."}]}, {"n": 109, "ar": "الكافرون", "en": "Al-Kafirun", "mean": "The Disbelievers", "v": [{"a": "قُلْ يَا أَيُّهَا الْكَافِرُونَ", "t": "Qul ya ayyuhal-kafirun.", "e": "Say, \"O disbelievers,"}, {"a": "لَا أَعْبُدُ مَا تَعْبُدُونَ", "t": "La a'budu ma ta'budun.", "e": "I do not worship what you worship,"}, {"a": "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", "t": "Wa la antum 'abiduna ma a'bud.", "e": "nor do you worship what I worship."}, {"a": "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ", "t": "Wa la ana 'abidum-ma 'abattum.", "e": "Nor will I worship what you have worshipped,"}, {"a": "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", "t": "Wa la antum 'abiduna ma a'bud.", "e": "nor will you worship what I worship."}, {"a": "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", "t": "Lakum dinukum wa liya din.", "e": "For you is your religion, and for me is my religion.\""}]}, {"n": 110, "ar": "النصر", "en": "An-Nasr", "mean": "The Help", "v": [{"a": "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", "t": "Idha ja'a nasrullahi wal-fath.", "e": "When the help of Allah comes, and the victory,"}, {"a": "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", "t": "Wa ra'aytan-nasa yadkhuluna fi dinillahi afwaja.", "e": "and you see people entering the religion of Allah in crowds,"}, {"a": "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", "t": "Fasabbih bihamdi rabbika wastaghfirh, innahu kana tawwaba.", "e": "then glorify your Lord with praise and ask His forgiveness. Indeed, He is ever accepting of repentance."}]}, {"n": 111, "ar": "المسد", "en": "Al-Masad", "mean": "The Palm Fiber", "v": [{"a": "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", "t": "Tabbat yada Abi Lahabin wa tabb.", "e": "May the hands of Abu Lahab be ruined, and ruined is he."}, {"a": "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", "t": "Ma aghna 'anhu maluhu wa ma kasab.", "e": "His wealth and what he earned will not benefit him."}, {"a": "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", "t": "Sayasla naran dhata lahab.", "e": "He will burn in a Fire of blazing flames,"}, {"a": "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", "t": "Wamra'atuhu hammalatal-hatab.", "e": "and his wife, the carrier of firewood,"}, {"a": "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ", "t": "Fi jidiha hablum-mim masad.", "e": "around her neck a rope of twisted palm fiber."}]}, {"n": 112, "ar": "الإخلاص", "en": "Al-Ikhlas", "mean": "Sincerity", "v": [{"a": "قُلْ هُوَ اللَّهُ أَحَدٌ", "t": "Qul huwallahu ahad.", "e": "Say, \"He is Allah, the One."}, {"a": "اللَّهُ الصَّمَدُ", "t": "Allahus-samad.", "e": "Allah, the Eternal Refuge."}, {"a": "لَمْ يَلِدْ وَلَمْ يُولَدْ", "t": "Lam yalid wa lam yulad.", "e": "He has not begotten, nor was He begotten,"}, {"a": "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", "t": "Wa lam yakul-lahu kufuwan ahad.", "e": "and there is none comparable to Him.\""}]}, {"n": 113, "ar": "الفلق", "en": "Al-Falaq", "mean": "The Daybreak", "v": [{"a": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "t": "Qul a'udhu bi-rabbil-falaq.", "e": "Say, \"I seek refuge in the Lord of daybreak,"}, {"a": "مِن شَرِّ مَا خَلَقَ", "t": "Min sharri ma khalaq.", "e": "from the evil of what He has created,"}, {"a": "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "t": "Wa min sharri ghasiqin idha waqab.", "e": "and from the evil of the darkness when it settles,"}, {"a": "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "t": "Wa min sharrin-naffathati fil-'uqad.", "e": "and from the evil of those who blow on knots,"}, {"a": "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", "t": "Wa min sharri hasidin idha hasad.", "e": "and from the evil of an envier when he envies.\""}]}, {"n": 114, "ar": "الناس", "en": "An-Nas", "mean": "Mankind", "v": [{"a": "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "t": "Qul a'udhu bi-rabbin-nas.", "e": "Say, \"I seek refuge in the Lord of mankind,"}, {"a": "مَلِكِ النَّاسِ", "t": "Malikin-nas.", "e": "the Sovereign of mankind,"}, {"a": "إِلَٰهِ النَّاسِ", "t": "Ilahin-nas.", "e": "the God of mankind,"}, {"a": "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "t": "Min sharril-waswasil-khannas.", "e": "from the evil of the sneaky whisperer,"}, {"a": "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "t": "Alladhi yuwaswisu fi suduriin-nas.", "e": "who whispers in the hearts of mankind,"}, {"a": "مِنَ الْجِنَّةِ وَالنَّاسِ", "t": "Minal-jinnati wan-nas.", "e": "from among jinn and mankind.\""}]}];
  var SRC = ['https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/', 'https://server8.mp3quran.net/afs/'];   // reciter: Mishary Alafasy (two servers, the second is a backup)
  var audio = null, openN = 0, srcTry = 0, playingN = 0;

  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60); }

  function init() {
    var h = '<div id="srList">';
    DATA.forEach(function (d) {
      h += '<div class="card sr" id="sr' + d.n + '"><button class="srhead" data-n="' + d.n + '"><span class="srnum">' + d.n + '</span>' +
        '<span class="srnames"><b>' + d.en + '</b><small>' + d.mean + ' &middot; ' + d.v.length + ' ayahs</small></span><span class="srar">' + d.ar + '</span></button>' +
        '<div class="srbody" id="srb' + d.n + '"></div></div>';
    });
    h += '</div><p class="note">Recitation by Mishary Alafasy. Audio needs internet. The slower speeds help you learn and memorise.</p>';
    $('p-guide-surah').innerHTML = h;
    var hs = document.querySelectorAll('.srhead');
    for (var i = 0; i < hs.length; i++) { hs[i].onclick = function () { toggle(+this.getAttribute('data-n')); }; }
  }

  function ayahHtml(d) {
    var h = '<div class="srbismi"><div class="arb">' + BISMI.a + '</div><div class="trl">' + BISMI.t + '</div></div>';
    d.v.forEach(function (v, i) {
      h += '<div class="ayah"><div class="arb">' + v.a + ' <span class="anum">' + (i + 1) + '</span></div><div class="trl">' + v.t + '</div><div class="tr">' + v.e + '</div></div>';
    });
    return h;
  }
  function playerHtml(n) {
    return '<div class="player" id="pl' + n + '">' +
      '<div class="prow"><button class="pbtn" id="pp' + n + '" aria-label="Play">&#9654;</button>' +
      '<div class="pbar"><input type="range" id="pr' + n + '" min="0" max="1000" value="0"><div class="ptime"><span id="pc' + n + '">0:00</span><span id="pd' + n + '">--:--</span></div></div></div>' +
      '<div class="pspeed"><label for="ps' + n + '">Speed <b id="pv' + n + '">1.0x</b></label><input type="range" id="ps' + n + '" min="0.5" max="1" step="0.05" value="1"></div>' +
      '<div class="note" id="pm' + n + '"></div></div>';
  }

  function toggle(n) {
    if (openN === n) { close(n); openN = 0; return; }
    if (openN) { close(openN); }
    openN = n;
    var d = DATA.filter(function (x) { return x.n === n; })[0], body = $('srb' + n);
    body.innerHTML = playerHtml(n) + ayahHtml(d);
    body.style.display = 'block';
    $('sr' + n).classList.add('open');
    wire(n);
    $('sr' + n).scrollIntoView({behavior: 'smooth', block: 'start'});
  }
  function close(n) {
    if (playingN === n && audio) { audio.pause(); }
    var b = $('srb' + n);
    if (b) { b.style.display = 'none'; b.innerHTML = ''; }
    var c = $('sr' + n);
    if (c) { c.classList.remove('open'); }
  }

  function ensureAudio(n) {
    if (!audio) {
      audio = new Audio();
      audio.preload = 'none';
      try { audio.preservesPitch = true; audio.webkitPreservesPitch = true; } catch (e) {}
    }
    if (playingN !== n) {
      audio.pause();
      playingN = n; srcTry = 0;
      audio.src = SRC[0] + n + '.mp3';
    }
    return audio;
  }

  function wire(n) {
    var pp = $('pp' + n), pr = $('pr' + n), ps = $('ps' + n), pv = $('pv' + n), msg = $('pm' + n), seeking = false;
    function sync() {
      if (playingN !== n || !audio) { return; }
      var d = audio.duration || 0;
      $('pc' + n).textContent = fmt(audio.currentTime);
      $('pd' + n).textContent = d ? fmt(d) : '--:--';
      if (!seeking && d) { pr.value = Math.round(audio.currentTime / d * 1000); }
      pp.innerHTML = audio.paused ? '&#9654;' : '&#10074;&#10074;';
    }
    function bind() {
      audio.ontimeupdate = sync; audio.onloadedmetadata = sync; audio.onplay = sync; audio.onpause = sync;
      audio.onended = function () { sync(); pr.value = 0; $('pc' + n).textContent = '0:00'; pp.innerHTML = '&#9654;'; };
      audio.onwaiting = function () { msg.textContent = 'Loading audio...'; };
      audio.onplaying = function () { msg.textContent = ''; sync(); };
      audio.onerror = function () {
        if (srcTry < SRC.length - 1) { srcTry++; var t = audio.currentTime; audio.src = SRC[srcTry] + n + '.mp3'; audio.playbackRate = +ps.value; audio.play().catch(function () {}); return; }
        msg.textContent = 'Could not load the audio. Check your internet and try again.';
        pp.innerHTML = '&#9654;';
      };
    }
    pp.onclick = function () {
      var a = ensureAudio(n); bind();
      if (a.paused) {
        a.playbackRate = +ps.value;
        var pr_ = a.play();
        if (pr_ && pr_.catch) { pr_.catch(function () { msg.textContent = 'Tap play again to start the audio.'; }); }
      } else { a.pause(); }
    };
    pr.oninput = function () { seeking = true; if (playingN === n && audio && audio.duration) { $('pc' + n).textContent = fmt(pr.value / 1000 * audio.duration); } };
    pr.onchange = function () {
      var a = ensureAudio(n); bind();
      var go = function () { if (a.duration) { a.currentTime = pr.value / 1000 * a.duration; } seeking = false; };
      if (a.duration) { go(); } else { a.addEventListener('loadedmetadata', function f() { a.removeEventListener('loadedmetadata', f); go(); }); a.load(); }
    };
    ps.oninput = function () {
      pv.textContent = (+ps.value).toFixed(2).replace(/0$/, '') + 'x';
      if (audio && playingN === n) { audio.playbackRate = +ps.value; }
    };
    if (playingN === n && audio) { bind(); ps.value = audio.playbackRate || 1; pv.textContent = (+ps.value).toFixed(2).replace(/0$/, '') + 'x'; sync(); }
  }
  return {init: init};
})();
