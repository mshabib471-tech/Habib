/* -------------------------------------------------------------
   PRELOADER
-------------------------------------------------------------*/
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => (preloader.style.display = "none"), 400);
  }, 700);
});

/* -------------------------------------------------------------
   TOAST CLOSE
-------------------------------------------------------------*/
document.getElementById("toastClose")?.addEventListener("click", () => {
  document.getElementById("toast").style.display = "none";
});

/* -------------------------------------------------------------
   YEAR AUTO UPDATE (FOOTER)
-------------------------------------------------------------*/
document.getElementById("year").textContent = new Date().getFullYear();

/* -------------------------------------------------------------
   MOBILE DRAWER
-------------------------------------------------------------*/
const menuToggle = document.getElementById("menuToggle");
const mobileDrawer = document.getElementById("mobileDrawer");
const closeDrawer = document.getElementById("closeDrawer");

menuToggle?.addEventListener("click", () => {
  mobileDrawer.classList.add("open");
});

closeDrawer?.addEventListener("click", () => {
  mobileDrawer.classList.remove("open");
});

// Close drawer by clicking outside
document.addEventListener("click", (e) => {
  if (
    mobileDrawer.classList.contains("open") &&
    !mobileDrawer.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    mobileDrawer.classList.remove("open");
  }
});

/* -------------------------------------------------------------
   THEME TOGGLE (Light / Dark)
-------------------------------------------------------------*/
const themeToggle = document.getElementById("themeToggle");

function applyTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

// Load saved theme
let savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

// Toggle theme
themeToggle.addEventListener("click", () => {
  savedTheme = savedTheme === "light" ? "dark" : "light";
  localStorage.setItem("theme", savedTheme);
  applyTheme(savedTheme);
});

/* -------------------------------------------------------------
   SCROLL REVEAL ANIMATION
-------------------------------------------------------------*/
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 60) el.classList.add("active");
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* -------------------------------------------------------------
   PWA INSTALL BUTTON
-------------------------------------------------------------*/
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn?.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  if (choice.outcome === "accepted") {
    installBtn.style.display = "none";
  }
  deferredPrompt = null;
});

/* -------------------------------------------------------------
   SMOOTH SCROLL FOR BOTTOM CONTACT
-------------------------------------------------------------*/
document.querySelectorAll('.bn[href="#contact"]').forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth",
    });
  });
});