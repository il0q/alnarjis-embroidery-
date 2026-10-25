/* Alnarjis PWA shell — bump this version whenever core assets change. */
'use strict';
const CACHE_NAME = 'alnarjis-site-shell-v1-20261025';
const CORE_FILES = [
  'index.html', 'services.html', 'order.html', 'contact.html', 'thank-you.html',
  'offline.html', 'manifest.webmanifest', 'lo.png', 'lo.webp',
  'assets/alnarjis-192.png', 'assets/alnarjis-512.png', 'hero-poster.webp'
];
const absolute = (file) => new URL(file, self.registration.scope).href;
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_FILES.map(absolute))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('alnarjis-site-') && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('.mp4') || url.pathname.endsWith('.webm')) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request, { cache: 'no-cache' });
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch (_) {
        const cached = await caches.match(request) || await caches.match(absolute('offline.html')) || await caches.match(absolute('index.html'));
        return cached || Response.error();
      }
    })());
    return;
  }
  if (['image', 'style', 'script', 'font'].includes(request.destination) || url.pathname.endsWith('.webmanifest')) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      const update = fetch(request).then(async (response) => {
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      }).catch(() => null);
      return cached || await update || Response.error();
    })());
  }
});