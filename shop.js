/* =====================================================
   DRAWER MENU OPEN/CLOSE
===================================================== */

const drawer = document.getElementById("drawerMenu");
const drawerOverlay = document.getElementById("drawerOverlay");
const drawerOpen = document.getElementById("drawerOpen");
const drawerClose = document.getElementById("drawerClose");

drawerOpen.addEventListener("click", () => {
  drawer.classList.add("open");
  drawerOverlay.classList.add("active");
});

drawerClose.addEventListener("click", () => {
  drawer.classList.remove("open");
  drawerOverlay.classList.remove("active");
});

drawerOverlay.addEventListener("click", () => {
  drawer.classList.remove("open");
  drawerOverlay.classList.remove("active");
});


/* =====================================================
   LOCAL STORAGE HELPERS
===================================================== */

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist") || "[]");
}

function saveWishlist(list) {
  localStorage.setItem("wishlist", JSON.stringify(list));
}


/* =====================================================
   CART COUNT UPDATE
===================================================== */

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.qty, 0);

  const countBadge = document.getElementById("cartCount");
  if (countBadge) {
    countBadge.textContent = count;
  }
}

updateCartCount();


/* =====================================================
   ADD TO CART FUNCTION
===================================================== */

document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);

    let cart = getCart();

    // check if exists
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    saveCart(cart);
    updateCartCount();

    // Button feedback
    btn.textContent = "✓ Added";
    setTimeout(() => {
      btn.textContent = "🧺 Add to Cart";
    }, 1000);
  });
});


/* =====================================================
   ADD TO WISHLIST
===================================================== */

document.querySelectorAll(".wishlist-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;

    let list = getWishlist();

    if (!list.includes(name)) {
      list.push(name);
      saveWishlist(list);

      btn.textContent = "❤️ Added";
      setTimeout(() => {
        btn.textContent = "❤️ Wishlist";
      }, 800);
    }
  });
});


/* =====================================================
   CATEGORY FILTER
===================================================== */

const buttons = document.querySelectorAll(".cat-btn");
const products = document.querySelectorAll("[data-cat]");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    products.forEach(p => {
      if (cat === "all" || p.dataset.cat === cat) {
        p.style.display = "block";
      } else {
        p.style.display = "none";
      }
    });
  });
});


/* =====================================================
   SMOOTH SCROLL (for #smartphones, #accessories links)
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});