/* Main UI script for theme, preloader, drawer, toast, auth modal, login simulation */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const preloader = document.getElementById("preloader");
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const closeDrawer = document.getElementById("closeDrawer");
  const toast = document.getElementById("toast");
  const toastClose = document.getElementById("toastClose");
  const floatingWa = document.getElementById("floatingWa");
  const loginBtn = document.getElementById("loginBtn");
  const myAccountBtn = document.getElementById("myAccountBtn");
  const drawerAuthAction = document.getElementById("drawerAuthAction");

  // AUTH modal
  const authModal = document.getElementById("authModal");
  const authClose = document.getElementById("authClose");
  const authForm = document.getElementById("authForm");
  const authTitle = document.getElementById("authTitle");
  const authSubmit = document.getElementById("authSubmit");
  const switchToRegister = document.getElementById("switchToRegister");

  // Install prompt (placeholder)
  const installBtn = document.getElementById("installBtn");

  /* --------------------------
     PRELOADER: auto-hide after ~3s
     -------------------------- */
  setTimeout(() => {
    if (preloader) {
      preloader.style.transition = "opacity .35s ease";
      preloader.style.opacity = "0";
      setTimeout(() => preloader && preloader.remove(), 400);
    }
  }, 3000);

  /* --------------------------
     THEME: persist in localStorage
     -------------------------- */
  function applyTheme(theme) {
    if (theme === "dark") body.classList.add("dark");
    else body.classList.remove("dark");
  }
  let savedTheme = localStorage.getItem("habib_theme") || "dark";
  applyTheme(savedTheme);

  themeToggle && themeToggle.addEventListener("click", () => {
    savedTheme = (savedTheme === "dark") ? "light" : "dark";
    localStorage.setItem("habib_theme", savedTheme);
    applyTheme(savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
  });
  // set initial symbol
  themeToggle.textContent = (savedTheme === "dark") ? "🌙" : "☀️";

  /* --------------------------
     MOBILE DRAWER
     -------------------------- */
  menuToggle && menuToggle.addEventListener("click", () => {
    mobileDrawer.classList.add("open");
    mobileDrawer.setAttribute("aria-hidden", "false");
  });
  closeDrawer && closeDrawer.addEventListener("click", () => {
    mobileDrawer.classList.remove("open");
    mobileDrawer.setAttribute("aria-hidden", "true");
  });

  /* Close drawer when clicking outside (small) */
  document.addEventListener("click", (e) => {
    if (!mobileDrawer) return;
    if (!mobileDrawer.contains(e.target) && !menuToggle.contains(e.target) && mobileDrawer.classList.contains("open")) {
      mobileDrawer.classList.remove("open");
      mobileDrawer.setAttribute("aria-hidden", "true");
    }
  });

  /* --------------------------
     TOAST: auto hide + close button
     (we position toast above WA button by default via CSS)
     -------------------------- */
  if (toast) {
    // auto hide after 8s
    setTimeout(() => {
      toast.style.transition = "transform .35s ease, opacity .35s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      setTimeout(() => toast && toast.remove(), 380);
    }, 8000);

    toastClose && toastClose.addEventListener("click", () => {
      toast.style.opacity = "0";
      setTimeout(() => toast && toast.remove(), 220);
    });
  }

  /* --------------------------
     AUTH (simple simulated)
     - Show modal on loginBtn / drawer
     - "Login" stores simple flag in localStorage
     - After login show My Account and hide Login
     -------------------------- */

  function openAuthModal(mode = "login") {
    authModal.classList.add("open");
    authModal.setAttribute("aria-hidden", "false");
    authTitle.textContent = mode === "login" ? "Login" : "Create Account";
    authSubmit.textContent = mode === "login" ? "Login" : "Create";
  }
  function closeAuthModal() {
    authModal.classList.remove("open");
    authModal.setAttribute("aria-hidden", "true");
  }

  loginBtn && loginBtn.addEventListener("click", () => openAuthModal("login"));
  drawerAuthAction && drawerAuthAction.addEventListener("click", (e) => {
    e.preventDefault();
    openAuthModal("login");
  });

  authClose && authClose.addEventListener("click", closeAuthModal);

  switchToRegister && switchToRegister.addEventListener("click", () => {
    // switch to register view
    authTitle.textContent = "Create Account";
    authSubmit.textContent = "Create";
  });

  authForm && authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // simple validation
    const email = document.getElementById("authEmail").value.trim();
    if (!email) return alert("Please provide an email.");
    // simulate account creation / login by setting localStorage flag
    localStorage.setItem("habib_user", JSON.stringify({ email }));
    updateAuthUI();
    closeAuthModal();
  });

  function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem("habib_user") || "null");
    if (user) {
      loginBtn && (loginBtn.style.display = "none");
      myAccountBtn && (myAccountBtn.style.display = "inline-flex");
      drawerAuthAction && (drawerAuthAction.textContent = "My Account");
      // update any quick access
      const accountQuick = document.getElementById("accountQuick");
      if (accountQuick) accountQuick.href = "account.html";
    } else {
      loginBtn && (loginBtn.style.display = "inline-flex");
      myAccountBtn && (myAccountBtn.style.display = "none");
      drawerAuthAction && (drawerAuthAction.textContent = "Login / Register");
    }
  }
  // init
  updateAuthUI();

  // allow logout via myAccount button (for dev/demo)
  myAccountBtn && myAccountBtn.addEventListener("click", (e) => {
    // if clicked, open account page; but allow quick logout on long-press (dev)
    if (confirm("Logout and remove demo session? (Cancel to go to My Account page)")) {
      localStorage.removeItem("habib_user");
      updateAuthUI();
    } else {
      window.location.href = "account.html";
    }
  });

  /* --------------------------
     INSTALL button placeholder
     -------------------------- */
  installBtn && installBtn.addEventListener("click", () => {
    alert("Install prompt placeholder — PWA install will appear if available (this is demo).");
  });

  /* --------------------------
     Accessibility: hide toast with keyboard Esc
     -------------------------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (toast) toast.remove();
      closeAuthModal();
      mobileDrawer.classList.remove("open");
    }
  });

  /* --------------------------
     small layout fixes after load
     -------------------------- */
  window.addEventListener("resize", () => {
    // auto close drawer on large screens
    if (window.innerWidth > 900) {
      mobileDrawer.classList.remove("open");
    }
  });

  // set year
  const yearEl = document.getElementById("year");
  yearEl && (yearEl.textContent = new Date().getFullYear());
});