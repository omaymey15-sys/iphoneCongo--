// =========================== // store.js - STORES COMMUNAUTAIRES (VERSION PRO) // ===========================

// STORAGE KEYS const STORES_KEY = 'iphonecongo_stores'; const STORE_PRODUCTS_KEY = 'iphonecongo_store_products';

// FILTERS let currentHourFilter = 24; let currentCityFilter = '';

// GET DATA function getStores(){ return JSON.parse(localStorage.getItem(STORES_KEY)) || []; }

function getStoreProducts(){ return JSON.parse(localStorage.getItem(STORE_PRODUCTS_KEY)) || {}; }

// TIME FILTER function isRecent(date, hours){ const diff = (Date.now() - new Date(date)) / (10006060); return diff <= hours; }

// SET FILTER window.setHourFilter = function(hours){ currentHourFilter = hours; displayStores(); }

// CREATE PRODUCT CARD function createProductCard(p){ const div = document.createElement('div'); div.className = 'product';

div.innerHTML = <img src="${p.image}"> <h3>${p.title}</h3> <p>$${p.price}</p> <button onclick="contactStore('${p.whatsapp}','${p.title}',${p.price})">📤 WhatsApp</button>;

return div; }

// CONTACT window.contactStore = function(phone, title, price){ const msg = Bonjour, je veux ${title} à $${price}; window.open(https://wa.me/${phone}?text=${encodeURIComponent(msg)}); }

// CREATE STORE BLOCK function createStoreBlock(store, products){ const div = document.createElement('div'); div.className = 'store-block';

div.innerHTML = <h3>${store.name}</h3> <p>📍 ${store.city}</p> <div class="horiz-scroll"></div>;

const scroll = div.querySelector('.horiz-scroll');

products.forEach(p=>{ if(isRecent(p.date, currentHourFilter)){ scroll.appendChild(createProductCard(p)); } });

return div; }

// DISPLAY STORES function displayStores(){ const stores = getStores(); const productsMap = getStoreProducts();

const container = document.getElementById('stores'); const result = document.getElementById('result-count');

container.innerHTML = '';

let count = 0;

stores.forEach(store=>{ if(currentCityFilter && !store.city.toLowerCase().includes(currentCityFilter)) return;

const products = productsMap[store.id] || [];
const block = createStoreBlock(store, products);

container.appendChild(block);
count++;

});

result.textContent = ${count} stores trouvés; }

// SEARCH STORE document.getElementById('store-search').addEventListener('input', function(){ const q = this.value.toLowerCase(); const stores = getStores().filter(s=>s.name.toLowerCase().includes(q));

const container = document.getElementById('stores'); container.innerHTML = '';

stores.forEach(s=>{ const div = document.createElement('div'); div.className = 'store-block'; div.innerHTML = <h3>${s.name}</h3><p>${s.city}</p>; container.appendChild(div); }); });

// CITY FILTER const cityInput = document.getElementById('city'); if(cityInput){ cityInput.addEventListener('input', function(){ currentCityFilter = this.value.toLowerCase(); displayStores(); }); }

// INIT document.addEventListener('DOMContentLoaded', displayStores);
