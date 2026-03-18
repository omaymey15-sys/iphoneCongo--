// =========================== // script.js - VERSION PRO iPhoneCongo (sections + catégories) // ===========================

// CONFIG const WHATSAPP_NUMBER = '243972685669'; const OFFICIAL_KEY = 'iphonecongo_official';

// LOAD PRODUITS (localStorage ou fallback) function loadProducts(){ const data = localStorage.getItem(OFFICIAL_KEY); if(data) return JSON.parse(data);

// fallback demo return [ { id:1101, category:'iphone', title:'iPhone 15 Pro Max 256GB', price:1450, image:'https://via.placeholder.com/200', stores:['Lubumbashi','Kolwezi'], date:new Date().toISOString() }, { id:1201, category:'samsung', title:'Samsung Galaxy S24', price:950, image:'https://via.placeholder.com/200', stores:['Lubumbashi'], date:new Date(Date.now()-86400000).toISOString() }, { id:1301, category:'accessory', title:'AirPods Pro', price:250, image:'https://via.placeholder.com/200', stores:['Kolwezi'], date:new Date(Date.now()-3600000).toISOString() } ]; }

// UTIL function isNewProduct(p){ const diff = (Date.now() - new Date(p.date)) / (10006060); return diff <= 48; }

function formatPrice(p){ return $${p.toLocaleString()}; }

// CARD function createCard(p){ const card = document.createElement('div'); card.className = 'product';

if(isNewProduct(p)){ const b = document.createElement('div'); b.className = 'badge'; b.textContent = '✨ Nouveau'; card.appendChild(b); }

const img = document.createElement('img'); img.src = p.image; card.appendChild(img);

const h = document.createElement('h3'); h.textContent = p.title; card.appendChild(h);

const price = document.createElement('p'); price.textContent = formatPrice(p.price); card.appendChild(price);

const btn = document.createElement('button'); btn.textContent = '📤 WhatsApp'; btn.onclick = ()=>{ const msg = Bonjour, je veux ${p.title} à ${formatPrice(p.price)}; window.open(https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}); }; card.appendChild(btn);

return card; }

// DISPLAY function displayAll(){ const data = loadProducts();

const newC = document.getElementById('products'); const iphoneC = document.getElementById('iphone-products'); const samsungC = document.getElementById('samsung-products'); const accC = document.getElementById('accessories-products');

newC.innerHTML=''; iphoneC.innerHTML=''; samsungC.innerHTML=''; accC.innerHTML='';

let countNew=0, countI=0, countS=0, countA=0;

data.forEach(p=>{ const card = createCard(p);

if(isNewProduct(p)){
  newC.appendChild(card.cloneNode(true));
  countNew++;
}

if(p.category==='iphone'){
  iphoneC.appendChild(card.cloneNode(true));
  countI++;
}

if(p.category==='samsung'){
  samsungC.appendChild(card.cloneNode(true));
  countS++;
}

if(p.category==='accessory'){
  accC.appendChild(card.cloneNode(true));
  countA++;
}

});

document.getElementById('count-new').textContent = countNew; document.getElementById('count-iphone').textContent = countI; document.getElementById('count-samsung').textContent = countS; document.getElementById('count-accessories').textContent = countA; }

// SEARCH function setupSearch(){ const input = document.getElementById('search'); if(!input) return;

input.addEventListener('input', ()=>{ const q = input.value.toLowerCase(); const data = loadProducts().filter(p=>p.title.toLowerCase().includes(q));

const container = document.getElementById('products');
container.innerHTML='';

data.forEach(p=>container.appendChild(createCard(p)));

}); }

// INIT document.addEventListener('DOMContentLoaded', ()=>{ displayAll(); setupSearch(); });
