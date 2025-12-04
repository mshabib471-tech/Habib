/* ============================
   Basic UI interactivity
   ============================ */

/* CONFIG */
const PRELOADER_ENABLED = true; // set false to disable preloader completely
const PRELOADER_TIMEOUT = 3000; // ms

document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // preloader
  const preloader = document.getElementById('preloader');
  if (!PRELOADER_ENABLED) {
    preloader.classList.add('hidden');
  } else {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, PRELOADER_TIMEOUT);
  }

  // toast close
  const toastClose = document.getElementById('toastClose');
  const toast = document.getElementById('toast');
  toastClose?.addEventListener('click', () => toast.style.display = 'none');

  // mobile drawer
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');
  menuToggle?.addEventListener('click', () => {
    mobileDrawer.classList.toggle('open');
    mobileDrawer.setAttribute('aria-hidden', mobileDrawer.classList.contains('open') ? 'false' : 'true');
  });
  closeDrawer?.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  });

  // theme toggle (light/dark)
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('hb_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (currentTheme === 'dark') document.body.classList.add('dark');
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('hb_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  // login/register simulation using localStorage
  const loginBtn = document.getElementById('loginBtn');
  const myAccountBtn = document.getElementById('myAccountBtn');
  const drawerAuthAction = document.getElementById('drawerAuthAction');
  const accountQuick = document.getElementById('accountQuick');

  function updateAuthUI(){
    const logged = localStorage.getItem('hb_logged') === '1';
    if (logged) {
      loginBtn && (loginBtn.style.display = 'none');
      myAccountBtn && (myAccountBtn.style.display = 'inline-flex');
      drawerAuthAction && (drawerAuthAction.textContent = 'My Account');
      accountQuick && (accountQuick.setAttribute('href','account.html'));
    } else {
      loginBtn && (loginBtn.style.display = 'inline-flex');
      myAccountBtn && (myAccountBtn.style.display = 'none');
      drawerAuthAction && (drawerAuthAction.textContent = 'Login / Register');
      accountQuick && (accountQuick.setAttribute('href','login.html'));
    }
  }
  updateAuthUI();

  // quick login simulation (for testing) — click loginBtn will toggle logged state for now
  loginBtn?.addEventListener('click', (e)=>{
    e.preventDefault();
    // open actual login page if you have one
    // for demo toggle:
    const realLoginUrl = 'login.html';
    // if you want demo quick toggle uncomment:
    // localStorage.setItem('hb_logged','1'); updateAuthUI(); return;
    window.location.href = realLoginUrl;
  });

  // drawer auth action -> if logged go account else login
  drawerAuthAction?.addEventListener('click', (e)=>{
    e.preventDefault();
    const logged = localStorage.getItem('hb_logged') === '1';
    if (logged) window.location.href = 'account.html';
    else window.location.href = 'login.html';
  });

  // connect icons: ensure they are clickable and keyboard accessible (no further js needed)

  // Install PWA prompt handling
  let deferredPrompt = null;
  const installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.style.display = 'inline-block';
  });

  installBtn?.addEventListener('click', async (e) => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
      installBtn.style.display = 'none';
    } else {
      // If no PWA prompt available, you might show instructions
      alert('Install prompt not available. Use browser menu → Add to Home screen.');
    }
  });

  // Prevent horizontal zoom/overflow: ensure body scale stays 1 on mobile double-tap etc.
  // (We keep accessibility - do not fully disable user zoom; but CSS responsive fixes layout)
});

/* ============================
   Small helper functions
   ============================ */
(function(){
  // Expose simple auth helpers for your real login page
  window.hbAuth = {
    login: function(){ localStorage.setItem('hb_logged','1'); location.href = 'index.html'; },
    logout: function(){ localStorage.removeItem('hb_logged'); location.href = 'index.html'; },
    isLogged: function(){ return localStorage.getItem('hb_logged') === '1'; }
  }
})();