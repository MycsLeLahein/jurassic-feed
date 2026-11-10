/* Jurassic Feed — fonctionnement hors ligne.
   Incrémente VERSION à chaque nouvelle version de l'application pour forcer la mise à jour. */
const VERSION='jf-v5';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION&&k!=='jf-data').map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
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

/* Notifications : réveil périodique (Android, application installée) et clic sur la notification */
async function dueCheck(){
  const c=await caches.open('jf-data'),r=await c.match('jf-due.json');
  if(!r)return;
  const o=await r.json();
  if(!o.on)return;
  const now=new Date();
  if(now.getHours()<(o.hour||9))return;
  const td=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
  if((o.last||'')>=td)return;
  const end=new Date(now);end.setHours(0,0,0,0);
  const items=(o.items||[]).filter(i=>i.ts<=end.getTime());
  if(!items.length)return;
  const late=items.filter(i=>i.ts<end.getTime()).length;
  await self.registration.showNotification('Jurassic Feed · '+items.length+' à faire'+(late?' ('+late+' en retard)':''),{
    body:items.slice(0,4).map(i=>i.label).join('\n')+(items.length>4?'\n+ '+(items.length-4)+' autres':''),
    icon:'icon-192.png',badge:'icon-192.png',tag:'jf-daily'});
  o.last=td;
  await c.put('jf-due.json',new Response(JSON.stringify(o),{headers:{'Content-Type':'application/json'}}));
}
self.addEventListener('periodicsync',e=>{if(e.tag==='jf-due')e.waitUntil(dueCheck())});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){if('focus' in c)return c.focus()}
    return clients.openWindow('./');
  }));
});
