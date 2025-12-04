/* ---------------------------------------------------------
   AUTO FIX MOBILE ZOOM (IMPORTANT)
----------------------------------------------------------*/
document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});
document.addEventListener("gesturechange", function (e) {
  e.preventDefault();
});
document.addEventListener("gestureend", function (e) {
  e.preventDefault();
});


/* ---------------------------------------------------------
   YEAR FOOTER
----------------------------------------------------------*/
document.getElementById("year").textContent = new Date().getFullYear();


/* ---------------------------------------------------------
   TOAST AUTO-HIDE
----------------------------------------------------------*/
const toast = document.getElementById("toast");
const toastClose = document.getElementById("toastClose");

setTimeout(() => {
  toast.style.display = "none";
}, 3500);

toastClose.addEventListener("click", () => {
  toast.style.display = "none";
});


/* ---------------------------------------------------------
   THEME TOGGLE (DARK / LIGHT)
----------------------------------------------------------*/
const themeToggle = document.getElementById("themeToggle");
let currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") document.body.classList.add("dark");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

// initial icon
themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";


/* ---------------------------------------------------------
   MOBILE DRAWER
----------------------------------------------------------*/
const menuToggle = document.getElementById("menuToggle");
const mobileDrawer = document.getElementById("mobileDrawer");
const closeDrawer = document.getElementById("closeDrawer");

menuToggle.addEventListener("click", () => {
  mobileDrawer.classList.add("open");
});

closeDrawer.addEventListener("click", () => {
  mobileDrawer.classList.remove("open");
});


/* ---------------------------------------------------------
   LOGIN STATUS DETECTION (LOCALSTORAGE)
----------------------------------------------------------*/
// যদি firebase login ব্যবহার করো = এখানে firebase দিয়ে detect হবে
// এখন demo না—REAL login.html ব্যবহার করবে।

const loginBtn = document.getElementById("loginBtn");
const myAccountBtn = document.getElementById("myAccountBtn");
const accountQuick = document.getElementById("accountQuick");
const drawerAuthAction = document.getElementById("drawerAuthAction");

// চেক ইউজার লগইন কিনা
let userLogged = localStorage.getItem("userLogged") || "no";

function updateLoginUI() {
  if (userLogged === "yes") {
    loginBtn.style.display = "none";
    myAccountBtn.style.display = "inline-block";
    accountQuick.href = "account.html";
    drawerAuthAction.textContent = "My Account";
    drawerAuthAction.href = "account.html";
  } else {
    loginBtn.style.display = "inline-block";
    myAccountBtn.style.display = "none";
    drawerAuthAction.textContent = "Login / Register";
    drawerAuthAction.href = "login.html";
  }
}
updateLoginUI();


/* ---------------------------------------------------------
   PWA INSTALL
----------------------------------------------------------*/
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "inline-block";
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  const result = await deferredPrompt.userChoice;

  if (result.outcome === "accepted") {
    console.log("App Installed");
  }
});


/* ---------------------------------------------------------
   SCROLL REVEAL ANIMATION
----------------------------------------------------------*/
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  for (let el of revealElements) {
    let top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  }
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* ---------------------------------------------------------
   REMOVE DOUBLE-TAP ZOOM ON MOBILE
----------------------------------------------------------*/
let lastTouchTime = 0;

document.addEventListener("touchend", function (event) {
  const now = new Date().getTime();
  if (now - lastTouchTime <= 300) {
    event.preventDefault();
  }
  lastTouchTime = now;
}, false);