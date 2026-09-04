/* Guarda la app en el propio teléfono para que abra sin conexión.
   Para publicar una versión nueva, cambia el número de CACHE. */
const CACHE = "lista-v1";
const ARCHIVOS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icon-180.png", "./icon-192.png", "./icon-512.png"
];

self.addEventListener("install", ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)));
});

self.addEventListener("activate", ev => {
  ev.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Sirve desde el teléfono al instante y, si hay red, se trae la versión
   nueva en segundo plano para la próxima vez. */
self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  ev.respondWith(
    caches.match(req).then(guardada => {
      const red = fetch(req).then(res => {
        if (res && res.ok) {
          const copia = res.clone();
          caches.open(CACHE).then(c => c.put(req, copia));
        }
        return res;
      }).catch(() => guardada);
      return guardada || red;
    })
  );
});
