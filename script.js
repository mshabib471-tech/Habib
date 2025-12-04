/* Main behavior for index.html */
/* Handles: preloader, theme toggle, mobile drawer, toast, reveal on scroll, install prompt, login state UI */

const preloader = document.getElementById('preloader');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileDrawer = document.getElementById('mobileDrawer');
const closeDrawer = document.getElementById('closeDrawer');
const toast = document.getElementById('toast');
const toastClose = document.getElementById('toastClose');
const installBtn = document.getElementById('installBtn');
const loginBtn = document.getElementById('loginBtn');
const myAccountBtn = document.getElementById('myAccountBtn');
const drawerAuthAction = document.getElementById('drawerAuthAction');
const accountQuick = document.getElementById('accountQuick');

// ---------- PRELOADER ----------
document.addEventListener('DOMContentLoaded', () => {
  // small delay so user sees loading once
  setTimeout(() => {
    if (preloader) preloader.style.display = 'none';
    // show toast shortly after load
    setTimeout(() => showToast(), 600);
    revealOnScroll(); // run once
  }, 700);
});

// ---------- THEME ----------
const savedTheme = localStorage.getItem('habib_theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('habib_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// ---------- MOBILE DRAWER ----------
menuToggle?.addEventListener('click', () => {
  mobileDrawer.classList.add('open');
  mobileDrawer.setAttribute('aria-hidden', 'false');
});
closeDrawer?.addEventListener('click', () => {
  mobileDrawer.classList.remove('open');
  mobileDrawer.setAttribute('aria-hidden', 'true');
});
document.addEventListener('click', (e) => {
  if (!mobileDrawer.contains(e.target) && !menuToggle.contains(e.target) && mobileDrawer.classList.contains('open')) {
    mobileDrawer.classList.remove('open');
  }
});

// ---------- TOAST ----------
function showToast(){
  if(!toast) return;
  toast.classList.add('show');
}
toastClose?.addEventListener('click', () => {
  toast.classList.remove('show');
});

// ---------- REVEAL ON SCROLL ----------
function revealOnScroll(){
  const items = document.querySelectorAll('.reveal');
  const offset = window.innerHeight * 0.85;
  items.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < offset) el.classList.add('visible');
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('resize', revealOnScroll);

// ---------- INSTALL (PWA) - simple prompt capture ----------
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.style.display = 'inline-flex';
});
installBtn?.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    deferredPrompt = null;
  } else {
    // fallback: show instructions (not runtime installable)
    alert('Add to Home Screen: use your browser menu → Add to home screen.');
  }
});

// ---------- LOGIN STATE (simple localStorage toggle) ----------
function updateAuthUI() {
  const token = localStorage.getItem('habib_auth');
  if (token === '1') {
    loginBtn.style.display = 'none';
    myAccountBtn.style.display = 'inline-flex';
    drawerAuthAction.textContent = 'My Account';
    accountQuick.setAttribute('href','account.html');
  } else {
    loginBtn.style.display = 'inline-flex';
    myAccountBtn.style.display = 'none';
    drawerAuthAction.textContent = 'Login / Register';
    accountQuick.setAttribute('href','login.html');
  }
}
updateAuthUI();

// If drawer auth clicked, route to login or account
drawerAuthAction?.addEventListener('click', (e)=>{
  e.preventDefault();
  const token = localStorage.getItem('habib_auth');
  if(token==='1') window.location.href = 'account.html';
  else window.location.href = 'login.html';
});

// ---------- small accessibility fixes ----------
document.querySelectorAll('a').forEach(a => {
  if (a.getAttribute('href') === '#') a.addEventListener('click', e => e.preventDefault());
});

// On page load, set year
document.getElementById('year')?.innerText = new Date().getFullYear();