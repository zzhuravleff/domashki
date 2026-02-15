const CACHE = "domashki-cache-v1.0.0";

// сразу активировать новую версию
self.addEventListener("install", () => {
  self.skipWaiting();
});

// взять контроль над вкладками
self.addEventListener("activate", () => {
  clients.claim();
});

// принять команду обновления
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// простое кэширование
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
