/* Namaz - start-up and navigation */
var TITLES = {times: 'Prayer Times', tracker: 'Tracker', qibla: 'Qibla', guide: 'Guide', more: 'More'};

function showView(v) {
  var vs = document.querySelectorAll('.view');
  for (var i = 0; i < vs.length; i++) { vs[i].classList.toggle('on', vs[i].id === 'v-' + v); }
  var bs = document.querySelectorAll('#bar button');
  for (var j = 0; j < bs.length; j++) { bs[j].classList.toggle('on', bs[j].getAttribute('data-v') === v); }
  $('topTitle').textContent = TITLES[v];
  window.scrollTo(0, 0);
  try { sessionStorage.setItem('namaz.view', v); } catch (e) {}
  if (v === 'tracker') { Tracker.refresh(); }
}

function showSub(view, p) {
  var seg = document.querySelector('.seg[data-view="' + view + '"]');
  var bs = seg.querySelectorAll('button');
  for (var i = 0; i < bs.length; i++) { bs[i].classList.toggle('on', bs[i].getAttribute('data-p') === p); }
  var subs = $('v-' + view).querySelectorAll('.sub');
  for (var j = 0; j < subs.length; j++) { subs[j].classList.toggle('on', subs[j].id === 'p-' + view + '-' + p); }
}

(function () {
  loadState();
  applyDark();
  try { Online.init(); } catch (e) {}
  [Times, Tracker, Qibla, Guide, More].forEach(function (m) {
    try { m.init(); } catch (e) { toast('Error: ' + e.message); }
  });

  var bar = document.querySelectorAll('#bar button');
  for (var i = 0; i < bar.length; i++) { bar[i].onclick = function () { showView(this.getAttribute('data-v')); }; }
  var segs = document.querySelectorAll('.seg');
  for (var s = 0; s < segs.length; s++) {
    (function (seg) {
      var bs = seg.querySelectorAll('button');
      for (var k = 0; k < bs.length; k++) { bs[k].onclick = function () { showSub(seg.getAttribute('data-view'), this.getAttribute('data-p')); }; }
    })(segs[s]);
  }

  var v = 'times';   // the app always opens on Prayer Times
  showView(v);

  if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js').catch(function () {}); }
})();
