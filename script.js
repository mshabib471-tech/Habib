// script.js — v2
// Handles: drawer, theme, toast, auth modal (localStorage), install placeholder, UI toggles

(function () {
  // DOM
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');
  const toast = document.getElementById('toast');
  const toastClose = document.getElementById('toastClose');
  const themeToggle = document.getElementById('themeToggle');
  const loginBtn = document.getElementById('loginBtn');
  const myAccountBtn = document.getElementById('myAccountBtn');
  const drawerAuthAction = document.getElementById('drawerAuthAction');
  const authModal = document.getElementById('authModal');
  const authClose = document.getElementById('authClose');
  const tabLogin = document.getElementById('tabLogin');
  const tabSignup = document.getElementById('tabSignup');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const doLogin = document.getElementById('doLogin');
  const doSignup = document.getElementById('doSignup');
  const accountQuick = document.getElementById('accountQuick');
  const bottomAccount = document.getElementById('bottomAccount');
  const installBtn = document.getElementById('installBtn');

  // Drawer open/close
  menuToggle && menuToggle.addEventListener('click', () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
  });
  closeDrawer && closeDrawer.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  });

  // Close drawer when clicking outside (small)
  document.addEventListener('click', (e) => {
    if (!mobileDrawer) return;
    if (mobileDrawer.classList.contains('open')) {
      if (!mobileDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      }
    }
  });

  // Toast close
  toastClose && toastClose.addEventListener('click', () => {
    toast.style.display = 'none';
  });

  // Theme toggle (persist)
  const savedTheme = localStorage.getItem('hb_theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
  updateThemeButton();
  themeToggle && themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('hb_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeButton();
  });
  function updateThemeButton() {
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  }

  // AUTH: open modal from different buttons
  function openAuth(tab = 'login') {
    authModal.classList.add('show');
    authModal.setAttribute('aria-hidden', 'false');
    showAuthTab(tab);
  }
  function closeAuth() {
    authModal.classList.remove('show');
    authModal.setAttribute('aria-hidden', 'true');
  }

  loginBtn && loginBtn.addEventListener('click', (e) => { e.preventDefault(); openAuth('login'); });
  drawerAuthAction && drawerAuthAction.addEventListener('click', (e) => { e.preventDefault(); openAuth('login'); mobileDrawer.classList.remove('open'); });
  accountQuick && accountQuick.addEventListener('click', (e) => { e.preventDefault(); if (isLoggedIn()) { alert('Go to My Account (demo)'); } else { openAuth('login'); }});
  bottomAccount && bottomAccount.addEventListener('click', (e)=>{ e.preventDefault(); if (isLoggedIn()) { alert('My Account — demo'); } else openAuth('login'); });

  authClose && authClose.addEventListener('click', closeAuth);
  tabLogin && tabLogin.addEventListener('click', () => showAuthTab('login'));
  tabSignup && tabSignup.addEventListener('click', () => showAuthTab('signup'));

  function showAuthTab(tab) {
    if (tab === 'login') {
      tabLogin.classList.add('active'); tabSignup.classList.remove('active');
      loginForm.classList.remove('hidden'); signupForm.classList.add('hidden');
    } else {
      tabSignup.classList.add('active'); tabLogin.classList.remove('active');
      signupForm.classList.remove('hidden'); loginForm.classList.add('hidden');
    }
  }

  // Simple localStorage-based auth simulation
  function isLoggedIn() { return localStorage.getItem('hb_logged') === '1'; }
  function setLoggedIn(flag) {
    if (flag) localStorage.setItem('hb_logged', '1'); else localStorage.removeItem('hb_logged');
    refreshAuthUI();
  }

  function refreshAuthUI() {
    if (isLoggedIn()) {
      loginBtn.style.display = 'none';
      myAccountBtn.style.display = 'inline-flex';
      drawerAuthAction.textContent = 'My Account';
      bottomAccount.querySelector('span').textContent = 'Account';
    } else {
      loginBtn.style.display = '';
      myAccountBtn.style.display = 'none';
      drawerAuthAction.textContent = 'Login / Register';
      bottomAccount.querySelector('span').textContent = 'My Account';
    }
  }

  // Hook login / signup buttons
  doLogin && doLogin.addEventListener('click', () => {
    // For demo: accept any non-empty values
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value.trim();
    if (!email || !pass) { alert('Email & password দিন (demo)'); return; }
    setLoggedIn(true);
    closeAuth();
    alert('Logged in (demo). My Account দেখুন।');
  });

  doSignup && doSignup.addEventListener('click', () => {
    const fn = document.getElementById('signupFirst').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const pass = document.getElementById('signupPassword').value.trim();
    if (!fn || !email || !pass) { alert('সব ফিল্ড পূরণ করুন (demo)'); return; }
    setLoggedIn(true);
    closeAuth();
    alert('Account created (demo) ও Logged in।');
  });

  // init auth UI on load
  refreshAuthUI();

  // INSTALL placeholder
  installBtn && installBtn.addEventListener('click', () => {
    alert('Install prompt (demo) — implement PWA before using real prompt.');
  });

  // Close auth modal on outside click
  authModal && authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuth();
  });

  // Toast auto-hide after 6s
  setTimeout(()=>{ if (toast) toast.style.opacity = '0.01'; setTimeout(()=>{ if (toast) toast.style.display='none'; },400); },6000);

  // Year update
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

  // Accessibility: close drawer on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mobileDrawer && mobileDrawer.classList.remove('open');
      authModal && authModal.classList.remove('show');
    }
  });

  // Prevent layout zoom/overflow issues: ensure meta viewport set (index.html already has)
  // Also ensure container width and images responsive (handled in CSS)

  // Optional: on small screens, keep sticky card above hero but non-overlapping:
  // No JS needed because we used relative vc-sticky and normal flow.

})();