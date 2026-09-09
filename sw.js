/* Service worker de Lista.
   El número de abajo DEBE coincidir con el VERSION de index.html.
   Es el único número que hay que tocar al publicar una versión nueva. */
const VERSION = "1.6";
const CACHE   = "lista-" + VERSION;
const ESTATICOS = ["./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];

/* Instala y toma el control de inmediato, sin esperar a que se cierren
   las pestañas: en una app de pantalla de inicio eso no pasa nunca. */
self.addEventListener("install", ev => {
  ev.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(ESTATICOS.concat(["./", "./index.html"]));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", ev => {
  ev.waitUntil((async () => {
    const ks = await caches.keys();
    await Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* La página puede preguntar qué versión está sirviendo esta caché. */
self.addEventListener("message", ev => {
  if (ev.data === "version" && ev.source) ev.source.postMessage({ swVersion: VERSION });
});

const conTiempo = (p, ms) => Promise.race([
  p, new Promise((_, rej) => setTimeout(() => rej(new Error("tarda demasiado")), ms))
]);

self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const esPagina = req.mode === "navigate" ||
                   url.pathname.endsWith("/") || url.pathname.endsWith(".html");

  if (esPagina) {
    /* La página, primero de la red: con cobertura siempre la última versión.
       Si la red tarda más de 2,5 s (wifi del centro), se sirve la copia local. */
    ev.respondWith((async () => {
      try {
        const res = await conTiempo(fetch(req, { cache: "no-store" }), 2500);
        const c = await caches.open(CACHE);
        c.put("./index.html", res.clone());
        return res;
      } catch (e) {
        const guardada = await caches.match("./index.html");
        return guardada || Response.error();
      }
    })());
    return;
  }

  /* Iconos y manifiesto: de la caché, que no cambian. */
  ev.respondWith(caches.match(req).then(r => r || fetch(req)));
});
