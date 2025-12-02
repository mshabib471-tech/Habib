/* ===========================================================
   PRELOADER (SAFE VERSION)
=========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";

    setTimeout(() => preloader.style.display = "none", 300);
  }, 900);
});


/* ===========================================================
   DARK / LIGHT MODE
=========================================================== */
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
} else {
  if (themeToggle) themeToggle.textContent = "🌙";
}

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
}


/* ===========================================================
   MOBILE MENU (3 LINE MENU)
=========================================================== */
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
}


/* ===========================================================
   TOAST NOTIFICATION
=========================================================== */
const toast = document.getElementById("toast");
const toastClose = document.getElementById("toastClose");

setTimeout(() => {
  if (toast) toast.classList.add("show");
}, 1500);

if (toastClose) {
  toastClose.addEventListener("click", () => {
    toast.classList.remove("show");
  });
}


/* ===========================================================
   AUTO YEAR IN FOOTER
=========================================================== */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


/* ===========================================================
   SCROLL REVEAL ANIMATIONS
=========================================================== */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* ===========================================================
   SMOOTH ANCHOR SCROLL
=========================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      mobileMenu?.classList.remove("open");
    }
  });
});


/* ===========================================================
   PWA INSTALL BUTTON
=========================================================== */
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (installBtn) installBtn.style.display = "inline-flex";
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("App Installed");
    }

    deferredPrompt = null;
  });
}