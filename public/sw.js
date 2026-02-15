importScripts('/lib/version.js'); // или просто вставь как комментарий/строку, если не используешь import


const CACHE = `domashki-cache-v${version}`;
const urlsToCache = ["/", "/index.html", "/manifest.json", "/favicon.ico", "/_next/static/*"];

// Установка Service Worker
self.addEventListener("install", (event) => {
  self.skipWaiting(); // сразу активировать
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(urlsToCache))
  );
});

// Активация
self.addEventListener("activate", (event) => {
  // удаляем старые кэши
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — отдаём из кэша, если offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// Отправка сообщения клиенту о новой версии
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CHECK_VERSION") {
    event.source.postMessage({ type: "VERSION", version });
  }
});

// Логика для уведомления о новой версии:
// когда регистрируешь SW в ServiceWorkerRegister.tsx, нужно отправлять "CHECK_VERSION"
// и если версия отличается от сохранённой на клиенте, показывать пользователю окно обновления
