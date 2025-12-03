// ==========================
// PRELOADER
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const pre = document.getElementById("preloader");
  if (!pre) return;

  setTimeout(() => {
    pre.style.opacity = "0";
    pre.style.pointerEvents = "none";
    setTimeout(() => (pre.style.display = "none"), 300);
  }, 1000);
});

// ==========================
// THEME (LIGHT / DARK)
// ==========================
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("habib-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("habib-theme", isDark ? "dark" : "light");
  });
}

// ==========================
// MOBILE MENU
// ==========================
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

// ==========================
// FOOTER YEAR
// ==========================
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ==========================
// SCROLL REVEAL
// ==========================
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealEls.forEach(el => obs.observe(el));
}

// ==========================
// TOAST
// ==========================
const toast = document.getElementById("toast");
const toastClose = document.getElementById("toastClose");

if (toast) {
  setTimeout(() => {
    toast.classList.add("show");
  }, 2200);
}
if (toast && toastClose) {
  toastClose.addEventListener("click", () => {
    toast.classList.remove("show");
  });
}

// ==========================
// PWA INSTALL
// ==========================
let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

const installBtn = document.getElementById("installBtn");
if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) {
      alert("Add to Home Screen অপশন থেকে Install করুন।");
      return;
    }
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      deferredPrompt = null;
    }
  });
}