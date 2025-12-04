/* =========================================================
   1. PRELOADER
========================================================= */
window.addEventListener("load", () => {
  const pre = document.getElementById("preloader");
  setTimeout(() => {
    pre.style.opacity = "0";
    pre.style.pointerEvents = "none";
  }, 300);
});

/* =========================================================
   2. THEME TOGGLE (Light / Dark Mode)
========================================================= */
const themeBtn = document.getElementById("themeToggle");

function applyTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeBtn.textContent = "🌙";
  }
}

if (localStorage.getItem("theme")) {
  applyTheme(localStorage.getItem("theme"));
}

themeBtn.addEventListener("click", () => {
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  const newTheme = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});

/* =========================================================
   3. MOBILE DRAWER MENU
========================================================= */
const drawer = document.getElementById("mobileDrawer");
const menuBtn = document.getElementById("navToggle");
const closeBtn = document.getElementById("drawerClose");

menuBtn.addEventListener("click", () => {
  drawer.classList.add("open");
});
closeBtn.addEventListener("click", () => {
  drawer.classList.remove("open");
});

/* CLICK OUTSIDE TO CLOSE */
document.addEventListener("click", (e) => {
  if (!drawer.contains(e.target) && !menuBtn.contains(e.target)) {
    drawer.classList.remove("open");
  }
});

/* =========================================================
   4. TOAST ALERT
========================================================= */
const toast = document.getElementById("toast");
const toastClose = document.getElementById("toastClose");

setTimeout(() => {
  toast.classList.add("show");
}, 1500);

toastClose.addEventListener("click", () => {
  toast.classList.remove("show");
});

/* =========================================================
   5. FOOTER YEAR
========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================================
   6. PWA INSTALL HANDLER
========================================================= */
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "inline-flex";
});

installBtn.addEventListener("click", () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
  }
});

/* =========================================================
   7. ANIMATION ON SCROLL
========================================================= */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================================================
   8. FORM SAFE SUBMIT
========================================================= */
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", () => {
    const btn = form.querySelector("button[type='submit']");
    if (btn) {
      btn.textContent = "Sending...";
      btn.disabled = true;
    }
  });
});

/* =========================================================
   9. LOGIN / REGISTER AUTOMATIC SWITCH
========================================================= */
const loginBtn = document.getElementById("drawerLogin");
const registerBtn = document.getElementById("drawerRegister");
const drawerTitle = document.getElementById("drawerTitle");

let loggedIn = false;  
// future: real login system (firebase/php)

function updateDrawer() {
  if (loggedIn) {
    drawerTitle.textContent = "My Account";
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
  } else {
    drawerTitle.textContent = "Welcome!";
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
  }
}

updateDrawer();

/* DEMO LOGIN */
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    loggedIn = true;
    localStorage.setItem("logged", true);
    updateDrawer();
    alert("Logged in (demo). Now drawer shows My Account!");
  });
}

if (localStorage.getItem("logged")) {
  loggedIn = true;
  updateDrawer();
}

/* =========================================================
   10. FIX EMPTY LINKS SCROLL TOP
========================================================= */
document.querySelectorAll("a[href='#']").forEach((a) => {
  a.addEventListener("click", (e) => e.preventDefault());
});

/* =========================================================
   11. TOUCH SCROLL LOCK ON DRAWER
========================================================= */
drawer.addEventListener("touchmove", function (e) {
  e.stopPropagation();
});