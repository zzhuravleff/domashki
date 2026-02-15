importScripts('/lib/version.js'); // или просто вставь как комментарий/строку, если не используешь import

const CACHE = `domashki-cache-v${version}`;
const urlsToCache = ["/", "/index.html"];

// установка
self.addEventListener("install", (event) => {
  self.skipWaiting(); // сразу активировать
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(urlsToCache))
  );
});

// активация
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
