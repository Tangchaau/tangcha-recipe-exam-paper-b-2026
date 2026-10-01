const CACHE = "tangcha-recipe-exam-b-v2-2026-10-02-40q";
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(["./", "./index.html"])));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("tangcha-recipe-exam-b-v2-") && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const scope = new URL(self.registration.scope);
  const requested = new URL(event.request.url);
  if (event.request.mode === "navigate" && requested.origin === scope.origin && requested.pathname.startsWith(scope.pathname)) {
    event.respondWith(fetch(event.request).catch(() => caches.match("./index.html")));
  }
});
