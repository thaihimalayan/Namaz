/* Namaz - Surah: the last 10 surahs of the Quran with Arabic, transliteration, translation and audio (audio needs internet) */
var Surah = (function () {
  var BISMI = {a: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', t: 'Bismillahir-rahmanir-rahim.', e: 'In the name of Allah, the Most Gracious, the Most Merciful.'};
  var DATA = [{"n": 105, "ar": "الفيل", "en": "Al-Fil", "mean": "The Elephant", "v": [{"a": "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", "t": "Alam tara kayfa fa'ala rabbuka bi-ashabil-fil.", "e": "Have you not seen how your Lord dealt with the companions of the elephant?"}, {"a": "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", "t": "Alam yaj'al kaydahum fi tadlil.", "e": "Did He not make their plan go astray?"}, {"a": "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", "t": "Wa arsala 'alayhim tayran ababil.", "e": "And He sent against them flocks of birds,"}, {"a": "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ", "t": "Tarmihim bi-hijaratim-min sijjil.", "e": "striking them with stones of baked clay,"}, {"a": "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ", "t": "Fa ja'alahum ka'asfim-ma'kul.", "e": "and left them like eaten-up straw."}]}, {"n": 106, "ar": "قريش", "en": "Quraysh", "mean": "Quraysh", "v": [{"a": "لِإِيلَافِ قُرَيْشٍ", "t": "Li-ilafi Quraysh.", "e": "For the security of Quraysh,"}, {"a": "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", "t": "Ilafihim rihlatash-shita'i was-sayf.", "e": "their security during the winter and summer journeys,"}, {"a": "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ", "t": "Falya'budu rabba hadhal-bayt.", "e": "let them worship the Lord of this House,"}, {"a": "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ", "t": "Alladhi at'amahum min ju'in wa amanahum min khawf.", "e": "who fed them against hunger and made them safe from fear."}]}, {"n": 107, "ar": "الماعون", "en": "Al-Ma'un", "mean": "Small Kindnesses", "v": [{"a": "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", "t": "Ara'aytal-ladhi yukadhdhibu bid-din.", "e": "Have you seen the one who denies the Judgment?"}, {"a": "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", "t": "Fadhalikal-ladhi yadu'ul-yatim.", "e": "That is the one who pushes the orphan away,"}, {"a": "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", "t": "Wa la yahuddu 'ala ta'amil-miskin.", "e": "and does not urge the feeding of the poor."}, {"a": "فَوَيْلٌ لِّلْمُصَلِّينَ", "t": "Fawaylul lil-musallin.", "e": "So woe to those who pray,"}, {"a": "الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ", "t": "Alladhina hum 'an salatihim sahun.", "e": "who are heedless of their prayer,"}, {"a": "الَّذِينَ هُمْ يُرَاءُونَ", "t": "Alladhina hum yura'un.", "e": "who only want to be seen,"}, {"a": "وَيَمْنَعُونَ الْمَاعُونَ", "t": "Wa yamna'unal-ma'un.", "e": "and who refuse small acts of kindness."}]}, {"n": 108, "ar": "الكوثر", "en": "Al-Kawthar", "mean": "The Abundance", "v": [{"a": "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "t": "Inna a'taynakal-kawthar.", "e": "Indeed, We have given you al-Kawthar."}, {"a": "فَصَلِّ لِرَبِّكَ وَانْحَرْ", "t": "Fasalli li-rabbika wanhar.", "e": "So pray to your Lord and sacrifice."}, {"a": "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", "t": "Inna shani'aka huwal-abtar.", "e": "Indeed, the one who hates you is the one cut off."}]}, {"n": 109, "ar": "الكافرون", "en": "Al-Kafirun", "mean": "The Disbelievers", "v": [{"a": "قُلْ يَا أَيُّهَا الْكَافِرُونَ", "t": "Qul ya ayyuhal-kafirun.", "e": "Say, \"O disbelievers,"}, {"a": "لَا أَعْبُدُ مَا تَعْبُدُونَ", "t": "La a'budu ma ta'budun.", "e": "I do not worship what you worship,"}, {"a": "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", "t": "Wa la antum 'abiduna ma a'bud.", "e": "nor do you worship what I worship."}, {"a": "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ", "t": "Wa la ana 'abidum-ma 'abattum.", "e": "Nor will I worship what you have worshipped,"}, {"a": "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", "t": "Wa la antum 'abiduna ma a'bud.", "e": "nor will you worship what I worship."}, {"a": "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", "t": "Lakum dinukum wa liya din.", "e": "For you is your religion, and for me is my religion.\""}]}, {"n": 110, "ar": "النصر", "en": "An-Nasr", "mean": "The Help", "v": [{"a": "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", "t": "Idha ja'a nasrullahi wal-fath.", "e": "When the help of Allah comes, and the victory,"}, {"a": "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", "t": "Wa ra'aytan-nasa yadkhuluna fi dinillahi afwaja.", "e": "and you see people entering the religion of Allah in crowds,"}, {"a": "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", "t": "Fasabbih bihamdi rabbika wastaghfirh, innahu kana tawwaba.", "e": "then glorify your Lord with praise and ask His forgiveness. Indeed, He is ever accepting of repentance."}]}, {"n": 111, "ar": "المسد", "en": "Al-Masad", "mean": "The Palm Fiber", "v": [{"a": "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", "t": "Tabbat yada Abi Lahabin wa tabb.", "e": "May the hands of Abu Lahab be ruined, and ruined is he."}, {"a": "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", "t": "Ma aghna 'anhu maluhu wa ma kasab.", "e": "His wealth and what he earned will not benefit him."}, {"a": "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", "t": "Sayasla naran dhata lahab.", "e": "He will burn in a Fire of blazing flames,"}, {"a": "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", "t": "Wamra'atuhu hammalatal-hatab.", "e": "and his wife, the carrier of firewood,"}, {"a": "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ", "t": "Fi jidiha hablum-mim masad.", "e": "around her neck a rope of twisted palm fiber."}]}, {"n": 112, "ar": "الإخلاص", "en": "Al-Ikhlas", "mean": "Sincerity", "v": [{"a": "قُلْ هُوَ اللَّهُ أَحَدٌ", "t": "Qul huwallahu ahad.", "e": "Say, \"He is Allah, the One."}, {"a": "اللَّهُ الصَّمَدُ", "t": "Allahus-samad.", "e": "Allah, the Eternal Refuge."}, {"a": "لَمْ يَلِدْ وَلَمْ يُولَدْ", "t": "Lam yalid wa lam yulad.", "e": "He has not begotten, nor was He begotten,"}, {"a": "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", "t": "Wa lam yakul-lahu kufuwan ahad.", "e": "and there is none comparable to Him.\""}]}, {"n": 113, "ar": "الفلق", "en": "Al-Falaq", "mean": "The Daybreak", "v": [{"a": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "t": "Qul a'udhu bi-rabbil-falaq.", "e": "Say, \"I seek refuge in the Lord of daybreak,"}, {"a": "مِن شَرِّ مَا خَلَقَ", "t": "Min sharri ma khalaq.", "e": "from the evil of what He has created,"}, {"a": "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "t": "Wa min sharri ghasiqin idha waqab.", "e": "and from the evil of the darkness when it settles,"}, {"a": "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "t": "Wa min sharrin-naffathati fil-'uqad.", "e": "and from the evil of those who blow on knots,"}, {"a": "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", "t": "Wa min sharri hasidin idha hasad.", "e": "and from the evil of an envier when he envies.\""}]}, {"n": 114, "ar": "الناس", "en": "An-Nas", "mean": "Mankind", "v": [{"a": "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "t": "Qul a'udhu bi-rabbin-nas.", "e": "Say, \"I seek refuge in the Lord of mankind,"}, {"a": "مَلِكِ النَّاسِ", "t": "Malikin-nas.", "e": "the Sovereign of mankind,"}, {"a": "إِلَٰهِ النَّاسِ", "t": "Ilahin-nas.", "e": "the God of mankind,"}, {"a": "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "t": "Min sharril-waswasil-khannas.", "e": "from the evil of the sneaky whisperer,"}, {"a": "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "t": "Alladhi yuwaswisu fi suduriin-nas.", "e": "who whispers in the hearts of mankind,"}, {"a": "مِنَ الْجِنَّةِ وَالنَّاسِ", "t": "Minal-jinnati wan-nas.", "e": "from among jinn and mankind.\""}]}];
  var QAPI = 'https://api.alquran.cloud/v1/';   // Arabic text, transliteration and Saheeh International translation (saved on the phone after the first time)
  var MORE = [
    {k: 'kursi', ar: 'آية الكرسي', en: 'Ayat al-Kursi', mean: 'The Throne Verse, 2:255', q: 'ayah/2:255', count: 1, nobismi: true,
     urls: ['https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3', 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3']},
    {k: '36', ar: 'يس', en: 'Ya-Sin', mean: 'Ya Sin', q: 'surah/36', count: 83},
    {k: '55', ar: 'الرحمن', en: 'Ar-Rahman', mean: 'The Most Merciful', q: 'surah/55', count: 78},
    {k: '56', ar: 'الواقعة', en: 'Al-Waqi\'ah', mean: 'The Event', q: 'surah/56', count: 96},
    {k: '67', ar: 'الملك', en: 'Al-Mulk', mean: 'The Sovereignty', q: 'surah/67', count: 30},
    {k: '73', ar: 'المزمل', en: 'Al-Muzzammil', mean: 'The Enwrapped One', q: 'surah/73', count: 20}
  ];
  var ITEMS = {};   // key -> item
  var audio = null, openK = '', srcTry = 0, playingK = '';

  function pad3(n) { return ('00' + n).slice(-3); }
  function surahUrls(n) { return ['https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/' + n + '.mp3', 'https://server8.mp3quran.net/afs/' + pad3(n) + '.mp3']; }   // reciter: Mishary Alafasy (second server is a backup)
  DATA.forEach(function (d) { d.k = String(d.n); d.count = d.v.length; d.urls = surahUrls(d.n); ITEMS[d.k] = d; });
  MORE.forEach(function (d) { if (!d.urls) { d.urls = surahUrls(+d.k); } d.n = d.k === 'kursi' ? '' : d.k; ITEMS[d.k] = d; });

  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60); }

  function cardHtml(d) {
    return '<div class="card sr" id="sr' + d.k + '"><button class="srhead" data-k="' + d.k + '"><span class="srnum">' + (d.n || '&#9733;') + '</span>' +
      '<span class="srnames"><b>' + d.en + '</b><small>' + d.mean + ' &middot; ' + d.count + ' ayah' + (d.count === 1 ? '' : 's') + '</small></span><span class="srar">' + d.ar + '</span></button>' +
      '<div class="srbody" id="srb' + d.k + '"></div></div>';
  }
  var ALT = {kursi: 'kursi kursy throne ayatul ayatulkursi ayat al kursi 2:255', '36': 'yasin yaseen ya sin yaaseen', '55': 'rahman rehman arrahman', '56': 'waqiah waqia waqi\'a waqiat waqiaah', '67': 'mulk molk tabarak', '73': 'muzammil muzzammil muzamil',
    '105': 'fil feel elephant', '106': 'quraysh quraish', '107': 'maun maaun ma\'un', '108': 'kauthar kawthar kausar', '109': 'kafirun kafiroon kafirun', '110': 'nasr', '111': 'masad lahab tabbat', '112': 'ikhlas ikhlaas sincerity tawhid', '113': 'falaq falak', '114': 'nas naas mankind'};
  var ORDER = ['kursi', '36', '55', '56', '67', '73', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114'];
  function norm(t) { return String(t).toLowerCase().replace(/[\u2018\u2019'`\-]/g, '').replace(/\s+/g, ' ').trim(); }
  function init() {
    $('p-guide-surah').innerHTML = '<input id="srQ" class="duaq" type="search" placeholder="Search surah: yasin, rahman, mulk, ikhlas..." autocomplete="off" autocapitalize="off" spellcheck="false">' +
      '<div id="srList"></div>' +
      '<p class="note">Recitation by Mishary Alafasy. Audio needs internet. The slower speeds help you learn and memorise. Arabic text and transliteration from Tanzil / Al Quran Cloud; translation: Saheeh International. The longer surahs download once and are then saved on your phone.</p>';
    $('srQ').oninput = function () { openK = ''; renderList(); };
    renderList();
  }
  function renderList() {
    var q = norm($('srQ').value), words = q ? q.split(' ') : [], h = '', n = 0;
    ORDER.forEach(function (k) {
      var d = ITEMS[k], hay = norm(d.en + ' ' + d.mean + ' ' + (ALT[k] || '') + ' ' + d.n) + ' ' + d.ar;
      if (words.every(function (w) { return hay.indexOf(w) >= 0; })) { h += cardHtml(d); n++; }
    });
    $('srList').innerHTML = n ? h : '<p class="note">No surah found. Try another name, like yasin, rahman, waqiah, mulk or ikhlas.</p>';
    var hs = document.querySelectorAll('.srhead');
    for (var i = 0; i < hs.length; i++) { hs[i].onclick = function () { toggle(this.getAttribute('data-k')); }; }
  }

  function ayahHtml(d) {
    var h = d.nobismi ? '' : '<div class="srbismi"><div class="arb">' + BISMI.a + '</div><div class="trl">' + BISMI.t + '</div></div>';
    d.v.forEach(function (v, i) {
      h += '<div class="ayah"><div class="arb">' + v.a + ' <span class="anum">' + (i + 1) + '</span></div><div class="trl">' + esc(v.t) + '</div><div class="tr">' + esc(v.e) + '</div></div>';
    });
    return h;
  }
  function playerHtml(k) {
    return '<div class="player" id="pl' + k + '">' +
      '<div class="prow"><button class="pbtn" id="pp' + k + '" aria-label="Play">&#9654;</button>' +
      '<div class="pbar"><input type="range" id="pr' + k + '" min="0" max="1000" value="0"><div class="ptime"><span id="pc' + k + '">0:00</span><span id="pd' + k + '">--:--</span></div></div></div>' +
      '<div class="pspeed"><label for="ps' + k + '">Speed <b id="pv' + k + '">1.0x</b></label><input type="range" id="ps' + k + '" min="0.5" max="1" step="0.05" value="1"></div>' +
      '<div class="note" id="pm' + k + '"></div></div>';
  }

  /* text of the longer surahs: from the phone's memory, else downloaded once */
  function loadText(d, done) {
    if (d.v) { done(true); return; }
    try { var c = JSON.parse(localStorage.getItem('namaz.q.' + d.k) || 'null'); if (c && c.length) { d.v = c; done(true); return; } } catch (e) {}
    if (typeof fetch !== 'function') { done(false); return; }
    fetch(QAPI + d.q + '/editions/quran-uthmani,en.transliteration,en.sahih')
      .then(function (r) { if (!r.ok) { throw 0; } return r.json(); })
      .then(function (j) {
        var eds = j.data, ar, tr, en;
        if (eds[0] && eds[0].ayahs) { ar = eds[0].ayahs; tr = eds[1].ayahs; en = eds[2].ayahs; } else { ar = [eds[0]]; tr = [eds[1]]; en = [eds[2]]; }
        var v = ar.map(function (x, i) {
          var a = x.text;
          if (i === 0 && !d.nobismi && /^\u0628\u0650\u0633\u0652\u0645\u0650/.test(a)) { a = a.split(' ').slice(4).join(' '); }   // the page shows Bismillah on its own line
          return {a: a, t: tr[i].text, e: en[i].text};
        });
        d.v = v;
        try { localStorage.setItem('namaz.q.' + d.k, JSON.stringify(v)); } catch (e) {}
        done(true);
      })
      .catch(function () { done(false); });
  }

  function toggle(k) {
    if (openK === k) { close(k); openK = ''; return; }
    if (openK) { close(openK); }
    openK = k;
    var d = ITEMS[k], body = $('srb' + k);
    body.innerHTML = playerHtml(k) + '<div id="txt' + k + '"></div>';
    body.style.display = 'block';
    $('sr' + k).classList.add('open');
    wire(k);
    var box = $('txt' + k);
    if (d.v) { box.innerHTML = ayahHtml(d); }
    else {
      box.innerHTML = '<p class="note">Loading the text...</p>';
      loadText(d, function (ok) {
        if (openK !== k) { return; }
        box.innerHTML = ok ? ayahHtml(d) : '<p class="note">Could not load the text. It needs internet the first time. Close this surah and open it again.</p>';
      });
    }
    $('sr' + k).scrollIntoView({behavior: 'smooth', block: 'start'});
  }
  function close(k) {
    if (playingK === k && audio) { audio.pause(); }
    var b = $('srb' + k);
    if (b) { b.style.display = 'none'; b.innerHTML = ''; }
    var c = $('sr' + k);
    if (c) { c.classList.remove('open'); }
  }

  function ensureAudio(k) {
    if (!audio) {
      audio = new Audio();
      audio.preload = 'none';
      try { audio.preservesPitch = true; audio.webkitPreservesPitch = true; } catch (e) {}
    }
    if (playingK !== k) {
      audio.pause();
      playingK = k; srcTry = 0;
      audio.src = ITEMS[k].urls[0];
    }
    return audio;
  }

  function wire(k) {
    var pp = $('pp' + k), pr = $('pr' + k), ps = $('ps' + k), pv = $('pv' + k), msg = $('pm' + k), seeking = false, urls = ITEMS[k].urls;
    function sync() {
      if (playingK !== k || !audio) { return; }
      var d = audio.duration || 0;
      $('pc' + k).textContent = fmt(audio.currentTime);
      $('pd' + k).textContent = d ? fmt(d) : '--:--';
      if (!seeking && d) { pr.value = Math.round(audio.currentTime / d * 1000); }
      pp.innerHTML = audio.paused ? '&#9654;' : '&#10074;&#10074;';
    }
    function bind() {
      audio.ontimeupdate = sync; audio.onloadedmetadata = sync; audio.onplay = sync; audio.onpause = sync;
      audio.onended = function () { sync(); pr.value = 0; $('pc' + k).textContent = '0:00'; pp.innerHTML = '&#9654;'; };
      audio.onwaiting = function () { msg.textContent = 'Loading audio...'; };
      audio.onplaying = function () { msg.textContent = ''; sync(); };
      audio.onerror = function () {
        if (srcTry < urls.length - 1) { srcTry++; audio.src = urls[srcTry]; audio.playbackRate = +ps.value; audio.play().catch(function () {}); return; }
        msg.textContent = 'Could not load the audio. Check your internet and try again.';
        pp.innerHTML = '&#9654;';
      };
    }
    function label() { pv.textContent = (+ps.value).toFixed(2).replace(/0$/, '') + 'x'; }
    pp.onclick = function () {
      var a = ensureAudio(k); bind();
      if (a.paused) {
        a.playbackRate = +ps.value;
        var p_ = a.play();
        if (p_ && p_.catch) { p_.catch(function () { msg.textContent = 'Tap play again to start the audio.'; }); }
      } else { a.pause(); }
    };
    pr.oninput = function () { seeking = true; if (playingK === k && audio && audio.duration) { $('pc' + k).textContent = fmt(pr.value / 1000 * audio.duration); } };
    pr.onchange = function () {
      var a = ensureAudio(k); bind();
      var go = function () { if (a.duration) { a.currentTime = pr.value / 1000 * a.duration; } seeking = false; };
      if (a.duration) { go(); } else { a.addEventListener('loadedmetadata', function f() { a.removeEventListener('loadedmetadata', f); go(); }); a.load(); }
    };
    ps.oninput = function () { label(); if (audio && playingK === k) { audio.playbackRate = +ps.value; } };
    if (playingK === k && audio) { bind(); ps.value = audio.playbackRate || 1; label(); sync(); }
  }
  return {init: init};
})();
