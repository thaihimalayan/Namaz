/* Namaz - service worker: keeps the app working offline (needs an https address). Bump VERSION (and APP_VER in store.js) with every change. */
var VERSION = 24;
var CACHE = 'namaz-v' + VERSION;
var FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png',
  'app.css', 'store.js', 'prayer.js', 'online.js', 'times.js', 'tracker.js',
  'qibla.js', 'guide.js', 'surah.js', 'more.js', 'app.js'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(FILES.map(function (f) { return fetch(new Request(f, {cache: 'reload'})).then(function (r) { return c.put(f, r); }); }));
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
// online: always the newest files; offline: the saved copy
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) { return; }   // audio and other sites go straight to the network
  e.respondWith(fetch(e.request).then(function (r) {
    var copy = r.clone();
    if (r.ok) { caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
    return r;
  }).catch(function () { return caches.match(e.request, {ignoreSearch: true}); }));
});
