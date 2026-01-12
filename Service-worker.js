// Installa il service worker e salva i file nella cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("profx-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "manifest.json"
      ]);
    })
  );
});

// Intercetta le richieste e prova a prendere dalla cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
