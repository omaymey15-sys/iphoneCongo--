// Vérifier si admin est connecté
if(localStorage.getItem('iphonecongo_admin') !== 'true'){
  alert('Veuillez vous connecter.');
  window.location.href = 'login.html';
}

// Variables
const PRODUCTS_KEY = 'iphonecongo_official';
let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];

const productsTable = document.getElementById('products-table');
const addBtn = document.getElementById('add-product-btn');
const logoutBtn = document.getElementById('logout');

// Afficher produits
function displayProducts(){
  productsTable.innerHTML = '';
  products.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="padding:0.5rem; border:1px solid var(--light-gray)">${p.id}</td>
      <td style="padding:0.5rem; border:1px solid var(--light-gray)">${p.title}</td>
      <td style="padding:0.5rem; border:1px solid var(--light-gray)">${p.category}</td>
      <td style="padding:0.5rem; border:1px solid var(--light-gray)">$${p.price}</td>
      <td style="padding:0.5rem; border:1px solid var(--light-gray)">
        <button onclick="editProduct(${p.id})" style="margin-right:0.5rem;">✏️</button>
        <button onclick="deleteProduct(${p.id})">🗑️</button>
      </td>
    `;
    productsTable.appendChild(tr);
  });
}

// Ajouter produit
addBtn.addEventListener('click', () => {
  const title = prompt('Titre du produit :');
  if(!title) return;
  const category = prompt('Catégorie (iphone, samsung, accessoire) :');
  if(!category) return;
  const price = parseFloat(prompt('Prix en $ :'));
  if(isNaN(price)) return;
  const image = prompt('URL de l\'image :') || '';
  const condition = prompt('Condition (Neuf/Occasion) :') || 'Neuf';

  const id = products.length ? Math.max(...products.map(p => p.id)) +1 : 1100;

  const newProduct = {id, title, category, price, image, condition, store:'Lubumbashi, Kolwezi', date:new Date().toISOString()};
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  displayProducts();
});

// Supprimer produit
function deleteProduct(id){
  if(confirm('Supprimer ce produit ?')){
    products = products.filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    displayProducts();
  }
}

// Éditer produit
function editProduct(id){
  const prod = products.find(p => p.id === id);
  if(!prod) return;

  const title = prompt('Titre :', prod.title);
  if(title) prod.title = title;
  const category = prompt('Catégorie :', prod.category);
  if(category) prod.category = category;
  const price = parseFloat(prompt('Prix :', prod.price));
  if(!isNaN(price)) prod.price = price;
  const image = prompt('URL image :', prod.image);
  if(image) prod.image = image;
  const condition = prompt('Condition :', prod.condition);
  if(condition) prod.condition = condition;

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  displayProducts();
}

// Déconnexion
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('iphonecongo_admin');
  window.location.href = 'login.html';
});

// Initialisation
displayProducts();
