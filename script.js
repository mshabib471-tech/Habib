/* ===========================================================
   PRELOADER (SAFE VERSION)
=========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";

      setTimeout(() => {
        preloader.style.display = "none";
      }, 300);
    }, 1200); // 1.2s পরে হাইড
  }
});


/* ===========================================================
   DARK / LIGHT MODE
=========================================================== */
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("habib-theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️"; // light আইকন
} else {
  body.classList.remove("dark");
  if (themeToggle) themeToggle.textContent = "🌙"; // dark আইকন
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("habib-theme", isDark ? "dark" : "light");
  });
}


/* ===========================================================
   MOBILE MENU TOGGLE
=========================================================== */
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  // কোনো মেনু লিঙ্কে ক্লিক করলে মেনু বন্ধ হবে
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
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
   SMOOTH SCROLL FOR INTERNAL LINKS
=========================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


/* ===========================================================
   SCROLL ANIMATIONS FOR .reveal
=========================================================== */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach(el => observer.observe(el));
} else {
  // পুরনো ব্রাউজার হলে সরাসরি visible করে দেই
  revealEls.forEach(el => el.classList.add("visible"));
}


/* ===========================================================
   TOAST NOTIFICATION
=========================================================== */
const toast = document.getElementById("toast");
const toastClose = document.getElementById("toastClose");

if (toast) {
  setTimeout(() => {
    toast.classList.add("show");
  }, 2500);

  if (toastClose) {
    toastClose.addEventListener("click", () => {
      toast.classList.remove("show");
    });
  }
}


/* ===========================================================
   PWA — SERVICE WORKER + INSTALL BUTTON
=========================================================== */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(err => {
    console.log("SW register error:", err);
  });
}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.style.display = "inline-flex";
  }
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  });
}