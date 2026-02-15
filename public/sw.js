importScripts('/lib/version.js'); // или просто вставь как комментарий/строку, если не используешь import


const CACHE = `domashki-cache-v${version}`;
const urlsToCache = ["/", "/index.html", "/manifest.json", "/favicon.ico", "/_next/static/*"];

// установка
self.addEventListener("install", (event) => {
  self.skipWaiting();
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
    caches.match(event.request).then((cached) => {
      // Если есть в кэше — возвращаем его
      if (cached) return cached;

      // Иначе пытаемся fetch
      return fetch(event.request).catch(() => {
        // Если fetch упал (offline) и это запрос на HTML — возвращаем кэшированный /
        if (event.request.mode === "navigate") {
          return caches.match("/");
        }
      });
    })
  );
});
