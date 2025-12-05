/* -----------------------------------------------------------
   BASIC HELPERS
----------------------------------------------------------- */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* -----------------------------------------------------------
   LOAD PRODUCTS.JSON
----------------------------------------------------------- */
let allProducts = [];
let loadedCount = 0;
const LOAD_SIZE = 8;

async function loadProducts() {
  const res = await fetch("products.json");
  const data = await res.json();
  allProducts = data.products;
  renderCategories(data.categories);
  renderProducts();
}

loadProducts();

/* -----------------------------------------------------------
   RENDER CATEGORY CHIPS + ICON ROW
----------------------------------------------------------- */
function renderCategories(categories) {
  const chips = $("#categoryChips");
  const row = $("#categoriesRow");

  categories.forEach((cat) => {
    chips.innerHTML += `<span data-cat="${cat.name}">${cat.name}</span>`;

    row.innerHTML += `
      <div class="category-item" data-cat="${cat.name}">
        <img src="${cat.icon}" alt="">
        <div>${cat.name}</div>
      </div>
    `;
  });

  // filter click
  chips.querySelectorAll("span").forEach((chip) => {
    chip.addEventListener("click", () => {
      const c = chip.dataset.cat;
      renderProducts(c);
    });
  });
}

/* -----------------------------------------------------------
   SHOW PRODUCTS
----------------------------------------------------------- */
function renderProducts(filter = null) {
  const grid = $("#productsGrid");

  let items = allProducts;
  if (filter) items = items.filter((p) => p.category === filter);

  grid.innerHTML = "";

  items.slice(0, loadedCount + LOAD_SIZE).forEach((p) => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <div class="price">৳${p.price}</div>
        <button onclick="orderWhatsApp('${p.name}', '${p.price}')">Order</button>
      </div>
    `;
  });

  loadedCount += LOAD_SIZE;
}

/* Load More Button */
$("#loadMoreBtn").addEventListener("click", () => renderProducts());

/* -----------------------------------------------------------
   SORTING
----------------------------------------------------------- */
$("#sortSelect").addEventListener("change", (e) => {
  const type = e.target.value;

  if (type === "price-asc")
    allProducts.sort((a, b) => a.price - b.price);

  if (type === "price-desc")
    allProducts.sort((a, b) => b.price - a.price);

  if (type === "newest")
    allProducts.sort((a, b) => b.id - a.id);

  if (type === "featured")
    allProducts.sort((a, b) => a.id - b.id);

  loadedCount = 0;
  renderProducts();
});

/* -----------------------------------------------------------
   WHATSAPP ORDER
----------------------------------------------------------- */
function orderWhatsApp(name, price) {
  window.open(`https://wa.me/8801868461577?text=আমি অর্ডার করতে চাই: ${name} (৳${price})`);
}

/* -----------------------------------------------------------
   MOBILE DRAWER
----------------------------------------------------------- */
$("#menuToggle").addEventListener("click", () => {
  $("#mobileDrawer").classList.add("open");
});

$("#closeDrawer").addEventListener("click", () => {
  $("#mobileDrawer").classList.remove("open");
});

/* -----------------------------------------------------------
   THEME TOGGLE
----------------------------------------------------------- */
$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  $("#themeToggle").textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

/* -----------------------------------------------------------
   PWA INSTALL BUTTON
----------------------------------------------------------- */
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  $("#installBtn").style.display = "inline-block";
});

$("#installBtn").addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
});