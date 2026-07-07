/* Bitoreal SW v2 — cache-first static, network-first HTML; never caches errors */
var C='bitoreal-v2';
var CORE=['/','/app.js','/favicon-dark.svg','/logo-white.svg','/logo-color.svg'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET'||new URL(req.url).origin!==location.origin)return;
  var isHTML=req.mode==='navigate'||(req.headers.get('accept')||'').indexOf('text/html')>-1;
  if(isHTML){
    e.respondWith(fetch(req).then(function(r){if(r.ok){var cp=r.clone();caches.open(C).then(function(c){c.put(req,cp)});}return r}).catch(function(){return caches.match(req).then(function(m){return m||caches.match('/')})}));
  }else{
    e.respondWith(caches.match(req).then(function(m){return m||fetch(req).then(function(r){if(r.ok){var cp=r.clone();caches.open(C).then(function(c){c.put(req,cp)});}return r})}));
  }
});
