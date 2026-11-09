/* Jurassic Feed — fonctionnement hors ligne.
   Incrémente VERSION à chaque nouvelle version de l'application pour forcer la mise à jour. */
const VERSION='jf-v2';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  const fonts=u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'||(u.hostname==='www.gstatic.com'&&u.pathname.startsWith('/firebasejs/'));
  if(u.origin!==location.origin&&!fonts)return;   /* Firestore / Auth / API : jamais interceptés (seuls polices et SDK Firebase sont mis en cache) */
  e.respondWith(caches.open(VERSION).then(async c=>{
    const hit=await c.match(r,{ignoreSearch:true});
    const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>null);
    if(hit){net.catch(()=>{});return hit}                /* instantané, mise à jour en arrière-plan */
    const res=await net;
    if(res)return res;
    if(r.mode==='navigate')return c.match('./index.html');
    return new Response('',{status:504});
  }));
});
