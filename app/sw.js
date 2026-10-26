// Service worker: app disponibile anche offline e notifiche push di Firebase.
importScripts('firebase-config.js');
if (self.FIREBASE_CONFIG && self.FIREBASE_CONFIG.apiKey){
  importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
                'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
  firebase.initializeApp(self.FIREBASE_CONFIG);
  firebase.messaging(); // mostra da solo le notifiche ricevute ad app chiusa
}

const CACHE = 'casa-v1';
const SHELL = ['./', 'index.html', 'cloud.js', 'firebase-config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const own = u.origin === location.origin;
  const lib = u.hostname === 'www.gstatic.com' || u.hostname.startsWith('fonts.');
  if (!own && !lib) return; // Firestore, login e il resto passano diretti
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    if (lib){ // librerie e font: dalla cache se ci sono
      const hit = await c.match(r); if (hit) return hit;
      const res = await fetch(r); if (res.ok) c.put(r, res.clone()); return res;
    }
    try { // file dell'app: prima la rete, così gli aggiornamenti arrivano subito
      const res = await fetch(r); if (res.ok) c.put(r, res.clone()); return res;
    } catch (x){
      return (await c.match(r, { ignoreSearch: true })) || (await c.match('index.html'));
    }
  })());
});
