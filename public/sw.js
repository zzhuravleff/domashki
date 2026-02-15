const CACHE = "domashki-cache-v1";

// установка
self.addEventListener("install", (event) => {
  // активируем новый SW сразу
  self.skipWaiting();
});

// активация
self.addEventListener("activate", (event) => {
  // берем контроль над всеми вкладками
  clients.claim();
});

// слушаем команду на обновление
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// кэширование
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});
