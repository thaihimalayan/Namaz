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
    initDua();
  }

  /* duas: [title, Arabic, English, source, group]  q = Quran, s = Sunnah, d = daily life */
  var DUAS = [
    ["Good in this world and the next", "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.", "Quran 2:201", "q"],
    ["For knowledge", "رَبِّ زِدْنِي عِلْمًا", "My Lord, increase me in knowledge.", "Quran 20:114", "q"],
    ["For ease and an open heart", "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", "My Lord, expand my chest for me and ease my task for me.", "Quran 20:25-26", "q"],
    ["Forgiveness and mercy", "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ", "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy on us, we will surely be among the losers.", "Quran 7:23", "q"],
    ["In hardship (dua of Yunus)", "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ", "There is no god but You; glory be to You. Indeed, I have been among the wrongdoers.", "Quran 21:87", "q"],
    ["Relying on Allah", "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", "Allah is sufficient for us, and He is the best disposer of affairs.", "Quran 3:173", "q"],
    ["For parents and believers", "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ", "Our Lord, forgive me, my parents and the believers on the Day the account is established.", "Quran 14:41", "q"],
    ["For family", "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", "Our Lord, grant us from our spouses and offspring comfort to our eyes, and make us leaders for the righteous.", "Quran 25:74", "q"],
    ["For a steady heart", "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ", "Our Lord, do not let our hearts deviate after You have guided us, and grant us mercy from Yourself. Indeed, You are the Bestower.", "Quran 3:8", "q"],
    ["Firmness in faith", "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ", "O Turner of hearts, keep my heart firm upon Your religion.", "Tirmidhi", "s"],
    ["Pardon (Laylat al-Qadr)", "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي", "O Allah, You are Pardoning and You love to pardon, so pardon me.", "Tirmidhi", "s"],
    ["Well-being", "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", "O Allah, I ask You for pardon and well-being in this world and the Hereafter.", "Abu Dawud, Ibn Majah", "s"],
    ["Before sleep", "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", "In Your name, O Allah, I die and I live.", "Bukhari", "d"],
    ["Accept our deeds", "رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ", "Our Lord, accept this from us. Indeed, You are the Hearing, the Knowing.", "Quran 2:127", "q"],
    ["Patience and firm feet", "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", "Our Lord, pour upon us patience, plant firmly our feet, and give us victory over the disbelieving people.", "Quran 2:250", "q"],
    ["Forgetting and mistakes", "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا", "Our Lord, do not impose blame upon us if we have forgotten or erred.", "Quran 2:286", "q"],
    ["Pardon, forgiveness, mercy", "رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا", "Our Lord, do not burden us with more than we have strength to bear. Pardon us, forgive us and have mercy on us. You are our Protector.", "Quran 2:286", "q"],
    ["Forgive our excesses", "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", "Our Lord, forgive us our sins and our excesses in our affairs, make our feet firm, and help us against the disbelieving people.", "Quran 3:147", "q"],
    ["Forgiveness for believers", "رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ", "Our Lord, we have believed, so forgive us our sins and protect us from the punishment of the Fire.", "Quran 3:16", "q"],
    ["Reflection on creation", "رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ", "Our Lord, You did not create this in vain. Glory be to You; protect us from the punishment of the Fire.", "Quran 3:191", "q"],
    ["Write us among the witnesses", "رَبَّنَا آمَنَّا فَاكْتُبْنَا مَعَ الشَّاهِدِينَ", "Our Lord, we have believed, so write us among the witnesses.", "Quran 5:83", "q"],
    ["Mercy and right guidance", "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا", "Our Lord, grant us mercy from Yourself and prepare for us right guidance in our affair.", "Quran 18:10", "q"],
    ["For righteous offspring", "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ", "My Lord, grant me [offspring] from among the righteous.", "Quran 37:100", "q"],
    ["In need of Allah's good", "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ", "My Lord, I am in need of whatever good You send down to me.", "Quran 28:24", "q"],
    ["In illness and adversity (Ayyub)", "أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ", "Indeed, adversity has touched me, and You are the Most Merciful of the merciful.", "Quran 21:83", "q"],
    ["Seeking refuge from ignorance", "رَبِّ إِنِّي أَعُوذُ بِكَ أَنْ أَسْأَلَكَ مَا لَيْسَ لِي بِهِ عِلْمٌ ۖ وَإِلَّا تَغْفِرْ لِي وَتَرْحَمْنِي أَكُن مِّنَ الْخَاسِرِينَ", "My Lord, I seek refuge in You from asking what I have no knowledge of. Unless You forgive me and have mercy on me, I will be among the losers.", "Quran 11:47", "q"],
    ["Gratitude", "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ", "My Lord, enable me to be grateful for Your favour which You have bestowed upon me and my parents, and to do righteous deeds that please You.", "Quran 27:19", "q"],
    ["Mercy for parents", "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", "My Lord, have mercy upon them as they brought me up when I was small.", "Quran 17:24", "q"],
    ["A good beginning and end", "رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا", "My Lord, cause me to enter a sound entrance and to exit a sound exit, and grant me from Yourself a supporting authority.", "Quran 17:80", "q"],
    ["Establishing prayer", "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ", "My Lord, make me an establisher of prayer, and from my descendants. Our Lord, accept my supplication.", "Quran 14:40", "q"],
    ["Perfect our light", "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا ۖ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", "Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent.", "Quran 66:8", "q"],
    ["Protection from the wrongdoers", "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلْقَوْمِ الظَّالِمِينَ وَنَجِّنَا بِرَحْمَتِكَ مِنَ الْقَوْمِ الْكَافِرِينَ", "Our Lord, do not make us a trial for the wrongdoing people, and save us by Your mercy from the disbelieving people.", "Quran 10:85-86", "q"],
    ["Allah's mercy encompasses all", "رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ", "Our Lord, You encompass all things in mercy and knowledge, so forgive those who repent and follow Your way.", "Quran 40:7", "q"],
    ["No resentment in our hearts", "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ", "Our Lord, forgive us and our brothers who preceded us in faith, and put not in our hearts any resentment toward those who have believed. Our Lord, You are Kind and Merciful.", "Quran 59:10", "q"],
    ["Trust and return", "رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ", "Our Lord, upon You we have relied, to You we have turned, and to You is the final destination.", "Quran 60:4", "q"],
    ["Asking forgiveness (Musa)", "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي", "My Lord, I have wronged myself, so forgive me.", "Quran 28:16", "q"],
    ["Seeking refuge from Shaytan", "رَّبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ", "My Lord, I seek refuge in You from the incitements of the devils, and I seek refuge in You, my Lord, lest they be present with me.", "Quran 23:97-98", "q"],
    ["Best of forgiveness (Sayyid al-Istighfar)", "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ", "O Allah, You are my Lord; there is no god but You. You created me and I am Your servant, and I keep Your covenant and promise as best I can. I seek refuge in You from the evil I have done. I acknowledge Your favour upon me and I acknowledge my sin, so forgive me, for none forgives sins but You.", "Bukhari", "s"],
    ["Protection morning and evening", "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", "In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, All-Knowing.", "Abu Dawud, Tirmidhi", "s"],
    ["Worry, grief and debt", "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ وَالْبُخْلِ وَالْجُبْنِ وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ", "O Allah, I seek refuge in You from worry and grief, weakness and laziness, miserliness and cowardice, the burden of debt and being overpowered by men.", "Bukhari", "s"],
    ["Guidance, piety and self-sufficiency", "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَىٰ وَالتُّقَىٰ وَالْعَفَافَ وَالْغِنَىٰ", "O Allah, I ask You for guidance, piety, chastity and self-sufficiency.", "Muslim", "s"],
    ["Help in worship", "اللَّهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ", "O Allah, help me to remember You, to thank You, and to worship You in the best way.", "Abu Dawud, Nasai", "s"],
    ["Seeking Allah's help", "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ", "O Ever-Living, O Sustainer, in Your mercy I seek relief.", "Tirmidhi", "s"],
    ["Blessings on the Prophet (Durood)", "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ", "O Allah, send blessings upon Muhammad and the family of Muhammad as You sent blessings upon Ibrahim and the family of Ibrahim. You are Praiseworthy and Glorious.", "Bukhari, Muslim", "s"],
    ["Protection from every evil", "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", "I seek refuge in the perfect words of Allah from the evil of what He has created.", "Muslim", "s"],
    ["For healing", "أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ وَاشْفِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا", "Remove the harm, Lord of mankind, and heal; You are the Healer. There is no healing except Your healing, a healing that leaves no illness.", "Bukhari, Muslim", "s"],
    ["Protection from punishment", "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", "O Allah, protect me from Your punishment on the Day You resurrect Your servants.", "Abu Dawud, Tirmidhi", "s"],
    ["Good character", "اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي", "O Allah, You made my form good, so make my character good.", "Ahmad", "s"],
    ["After the adhan", "اللَّهُمَّ رَبَّ هَٰذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ", "O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and the favour, and raise him to the praised station You promised him.", "Bukhari", "s"],
    ["On waking up", "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", "Praise be to Allah who gave us life after causing us to die, and to Him is the resurrection.", "Bukhari", "d"],
    ["Before eating", "بِسْمِ اللَّهِ", "In the name of Allah.", "Bukhari, Muslim", "d"],
    ["After eating", "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", "Praise be to Allah who fed us, gave us drink and made us Muslims.", "Abu Dawud, Tirmidhi", "d"],
    ["Entering the toilet", "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", "O Allah, I seek refuge in You from the male and female unclean spirits.", "Bukhari, Muslim", "d"],
    ["Leaving the toilet", "غُفْرَانَكَ", "I seek Your forgiveness.", "Abu Dawud, Tirmidhi", "d"],
    ["After wudu", "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", "I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger.", "Muslim", "d"],
    ["Entering the mosque", "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", "O Allah, open for me the doors of Your mercy.", "Muslim", "d"],
    ["Leaving the mosque", "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", "O Allah, I ask You of Your bounty.", "Muslim", "d"],
    ["Leaving home", "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", "In the name of Allah, I place my trust in Allah; there is no might or power except with Allah.", "Abu Dawud, Tirmidhi", "d"],
    ["Travelling", "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ", "Glory be to Him who has subjected this to us, and we could not have done it ourselves. And indeed, to our Lord we will return.", "Quran 43:13-14, Muslim", "d"],
    ["Arriving somewhere new", "رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ", "My Lord, let me land at a blessed landing place, and You are the best to accommodate.", "Quran 23:29", "d"],
    ["When it rains", "اللَّهُمَّ صَيِّبًا نَافِعًا", "O Allah, [make it] a beneficial rain.", "Bukhari", "d"]
  ];
  var DGROUPS = [['q', 'Duas from the Quran'], ['s', 'Duas from the Sunnah'], ['d', 'Daily life duas']];
  function duaCard(d, cls, label) {
    return '<div class="card dua ' + (cls || '') + '">' + (label ? '<div class="daily">' + label + '</div>' : '') +
      '<div class="ttl">' + d[0] + '</div><div class="arb">' + d[1] + '</div><div class="tr">' + d[2] + '</div><div class="src">' + d[3] + '</div></div>';
  }
  function initDua() {
    var a = PR.ymd(new Date(), curCity().tz), day = Math.floor(Date.UTC(a[0], a[1] - 1, a[2]) / 86400000);
    var pool = DUAS.filter(function (d) { return d[4] !== 'd'; });   // the dua of the day is a general one
    var pick = pool[day % pool.length];
    var h = duaCard(pick, 'today', 'Dua of the day');
    DGROUPS.forEach(function (g) {
      h += '<h3 style="margin:16px 2px 8px">' + g[1] + '</h3>';
      DUAS.forEach(function (d) { if (d[4] === g[0] && d !== pick) { h += duaCard(d); } });
    });
    $('p-guide-dua').innerHTML = h;
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
