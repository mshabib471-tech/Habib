/* -----------------------------------
   PRELOADER
----------------------------------- */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => preloader.style.opacity = "0", 300);
    setTimeout(() => preloader.style.display = "none", 800);
  }
});

/* -----------------------------------
   TOAST CLOSE
----------------------------------- */
const toast = document.getElementById("toast");
const toastClose = document.getElementById("toastClose");

if (toastClose) {
  toastClose.addEventListener("click", () => {
    toast.style.display = "none";
  });
}

/* -----------------------------------
   MOBILE DRAWER
----------------------------------- */
const mobileDrawer = document.getElementById("mobileDrawer");
const menuToggle = document.getElementById("menuToggle");
const closeDrawer = document.getElementById("closeDrawer");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    mobileDrawer.classList.add("open");
  });
}

if (closeDrawer) {
  closeDrawer.addEventListener("click", () => {
    mobileDrawer.classList.remove("open");
  });
}

/* Close drawer when clicking outside */
document.addEventListener("click", (e) => {
  if (
    mobileDrawer &&
    !mobileDrawer.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    mobileDrawer.classList.remove("open");
  }
});

/* -----------------------------------
   THEME TOGGLE (Dark / Light)
----------------------------------- */
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌙";
  } else {
    document.body.classList.remove("light-mode");
    themeToggle.textContent = "☀️";
  }
  localStorage.setItem("theme", theme);
}

let savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  savedTheme = savedTheme === "dark" ? "light" : "dark";
  applyTheme(savedTheme);
});

/* -----------------------------------
   PWA INSTALL BUTTON
----------------------------------- */
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (installBtn) installBtn.style.display = "block";

  installBtn?.addEventListener("click", () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      installBtn.style.display = "none";
    });
  });
});

/* -----------------------------------
   LOGIN / REGISTER MODALS
----------------------------------- */
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

const openLogin = document.getElementById("openLogin");
const openRegister = document.getElementById("openRegister");
const closeLogin = document.getElementById("closeLogin");
const closeRegister = document.getElementById("closeRegister");

openLogin?.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

openRegister?.addEventListener("click", () => {
  registerModal.style.display = "flex";
});

closeLogin?.addEventListener("click", () => {
  loginModal.style.display = "none";
});

closeRegister?.addEventListener("click", () => {
  registerModal.style.display = "none";
});

/* Close modal by clicking outside */
window.addEventListener("click", (e) => {
  if (e.target === loginModal) loginModal.style.display = "none";
  if (e.target === registerModal) registerModal.style.display = "none";
});

/* -----------------------------------
   SCROLL REVEAL EFFECT
----------------------------------- */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* -----------------------------------
   AUTO YEAR
----------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();