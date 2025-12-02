/* ----------------------------------------------------
   DARK / LIGHT MODE
---------------------------------------------------- */

const body = document.body;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("shop-theme");
if(savedTheme === "dark"){
  body.classList.add("dark");
  themeToggle.textContent = "🌙";
} else {
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", ()=>{
  body.classList.toggle("dark");

  if(body.classList.contains("dark")){
    themeToggle.textContent = "🌙";
    localStorage.setItem("shop-theme","dark");
  } else {
    themeToggle.textContent = "☀️";
    localStorage.setItem("shop-theme","light");
  }
});

/* ----------------------------------------------------
   DRAWER MENU
---------------------------------------------------- */

const drawer = document.getElementById("drawer");
const overlay = document.getElementById("drawer-overlay");
const openBtn = document.getElementById("menu-open");
const closeBtn = document.getElementById("menu-close");

openBtn.onclick = ()=>{
  drawer.classList.add("open");
  overlay.style.display="block";
};
closeBtn.onclick = closeDrawer;
overlay.onclick = closeDrawer;

function closeDrawer(){
  drawer.classList.remove("open");
  overlay.style.display="none";
}

/* ----------------------------------------------------
   CATEGORY FILTER
---------------------------------------------------- */

const catBtns = document.querySelectorAll(".cat-btn");
const products = document.querySelectorAll(".product-card");

catBtns.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    
    catBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.cat;

    products.forEach(card=>{
      if(cat === "all" || card.dataset.cat === cat){
        card.style.display="block";
      } else {
        card.style.display="none";
      }
    });

  });
});

/* ----------------------------------------------------
   CART / WISHLIST (LOCALSTORAGE COUNTER ONLY)
---------------------------------------------------- */

let cartCount = localStorage.getItem("cart-count") || 0;
let wishCount = localStorage.getItem("wish-count") || 0;

function updateCounters(){
  const cartEl = document.getElementById("cartCount");
  if(cartEl) cartEl.textContent = cartCount;
}
updateCounters();

document.querySelectorAll(".add-cart").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    cartCount++;
    localStorage.setItem("cart-count", cartCount);
    updateCounters();
  });
});

document.querySelectorAll(".wishlist-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    wishCount++;
    localStorage.setItem("wish-count", wishCount);
  });
});