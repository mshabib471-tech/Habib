// script.js (v4)
// Habib Business App - Main JS
// Handles: preloader, theme toggle, mobile drawer, toast, PWA install, form submit, year, small UI bits

(() => {
  "use strict";

  /* --------------------------
     Helper
  ---------------------------*/
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));

  /* --------------------------
     Elements
  ---------------------------*/
  const preloader = document.getElementById("preloader");
  const toast = document.getElementById("toast");
  const toastClose = document.getElementById("toastClose");
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const closeDrawer = document.getElementById("closeDrawer");
  const openLogin = document.getElementById("openLogin");
  const openRegister = document.getElementById("openRegister");
  const installBtn = document.getElementById("installBtn");
  const yearSpan = document.getElementById("year");
  const contactForm = document.querySelector("form.contact-form");
  const vcSticky = document.querySelector(".vc-sticky");

  /* --------------------------
     Preloader - hide after load
  ---------------------------*/
  window.addEventListener("load", () => {
    // small delay so user sees smooth transition
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = 0;
        preloader.style.pointerEvents = "none";
        setTimeout(() => preloader.remove(), 600);
      }
    }, 600);
  });

  /* --------------------------
     Year (footer)
  ---------------------------*/
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------
     Toast logic (auto hide)
  ---------------------------*/
  if (toast) {
    // auto hide after 7s
    const autoCloseTimeout = setTimeout(() => {
      toast.classList.add("hide");
    }, 7000);

    // close button
    if (toastClose) {
      toastClose.addEventListener("click", (e) => {
        e.preventDefault();
        clearTimeout(autoCloseTimeout);
        toast.classList.add("hide");
      });
    }
  }

  /* --------------------------
     Theme toggle with localStorage
  ---------------------------*/
  const THEME_KEY = "habib_theme";
  function applyTheme(themeName) {
    if (themeName === "dark") {
      document.body.classList.add("dark");
      if (themeToggle) themeToggle.textContent = "☀️";
    } else {
      document.body.classList.remove("dark");
      if (themeToggle) themeToggle.textContent = "🌙";
    }
    try { localStorage.setItem(THEME_KEY, themeName); } catch(e){}
  }

  // init theme
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) applyTheme(saved);
    else {
      // prefer user's OS preference
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  } catch (e) {
    applyTheme("light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      applyTheme(isDark ? "light" : "dark");
    });
  }

  /* --------------------------
     Mobile drawer open/close with overlay
  ---------------------------*/
  let overlayEl = null;
  function createOverlay() {
    overlayEl = document.createElement("div");
    overlayEl.className = "drawer-overlay";
    overlayEl.style.position = "fixed";
    overlayEl.style.inset = "0";
    overlayEl.style.background = "rgba(0,0,0,0.35)";
    overlayEl.style.zIndex = "9998";
    overlayEl.style.opacity = "0";
    overlayEl.style.transition = "opacity .25s ease";
    document.body.appendChild(overlayEl);
    // show
    requestAnimationFrame(() => overlayEl.style.opacity = "1");
    overlayEl.addEventListener("click", closeMobileDrawer);
  }

  function removeOverlay() {
    if (!overlayEl) return;
    overlayEl.style.opacity = "0";
    setTimeout(() => {
      if (overlayEl && overlayEl.parentNode) overlayEl.parentNode.removeChild(overlayEl);
      overlayEl = null;
    }, 250);
  }

  function openMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add("open");
    mobileDrawer.setAttribute("aria-hidden", "false");
    createOverlay();
    // prevent body scroll while open
    document.documentElement.style.overflow = "hidden";
  }

  function closeMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove("open");
    mobileDrawer.setAttribute("aria-hidden", "true");
    removeOverlay();
    document.documentElement.style.overflow = "";
  }

  if (menuToggle) menuToggle.addEventListener("click", openMobileDrawer);
  if (closeDrawer) closeDrawer.addEventListener("click", closeMobileDrawer);

  // Close drawer on Esc
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileDrawer();
  });

  /* --------------------------
     Drawer auth buttons (basic)
     -> you can replace with modal or real auth later
  ---------------------------*/
  if (openLogin) {
    openLogin.addEventListener("click", (e) => {
      e.preventDefault();
      closeMobileDrawer();
      // simple: navigate to account.html for now
      window.location.href = "account.html";
    });
  }
  if (openRegister) {
    openRegister.addEventListener("click", (e) => {
      e.preventDefault();
      closeMobileDrawer();
      window.location.href = "account.html";
    });
  }

  /* --------------------------
     PWA install prompt handling
  ---------------------------*/
  let deferredPrompt = null;
  if (installBtn) installBtn.style.display = "none"; // hide initially

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67+ from automatically showing the prompt
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
      installBtn.style.display = ""; // show
      installBtn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        if (!deferredPrompt) {
          // fallback: show simple instruction
          alert("To install: use your browser menu → Add to Home screen.");
          return;
        }
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        // userChoice resolves to {outcome: 'accepted'|'dismissed'}
        if (outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
        installBtn.style.display = "none";
      }, { once: true });
    }
  });

  /* --------------------------
     Contact form submit - Formspree friendly
     We'll show a friendly in-page success message and reset form.
  ---------------------------*/
  if (contactForm) {
    contactForm.addEventListener("submit", async (ev) => {
      // We allow the native submit to go through as well (Formspree),
      // but to provide better UX, intercept and show quick message using fetch.
      ev.preventDefault();
      const form = ev.currentTarget;
      const action = form.getAttribute("action") || "";
      const method = (form.getAttribute("method") || "POST").toUpperCase();

      const formData = new FormData(form);

      try {
        // Use fetch to submit to Formspree endpoint
        const res = await fetch(action, {
          method,
          body: formData,
          headers: {
            // Let browser set content-type for FormData
            "Accept": "application/json"
          }
        });

        if (res.ok) {
          // show success toast / message
          showTempMessage("Message sent — ধন্যবাদ! আপনি শীঘ্রই রেসপন্স পাবেন।", 5000);
          form.reset();
        } else {
          // handle errors gracefully
          const data = await res.json().catch(()=>({}));
          const msg = data?.error || "Send failed. Please try WhatsApp or email.";
          showTempMessage(msg, 6000);
        }
      } catch (err) {
        showTempMessage("Network error. Please try again or use WhatsApp.", 6000);
      }
    });
  }

  function showTempMessage(text, time = 4000) {
    // reuse toast area
    if (!toast) {
      alert(text);
      return;
    }
    // temporarily repurpose toast message
    const oldContent = toast.innerHTML;
    toast.classList.remove("hide");
    toast.innerHTML = `<div style="padding:8px 12px">${escapeHtml(text)}</div>`;
    setTimeout(() => {
      // restore original toast text (quick)
      toast.innerHTML = oldContent;
      toast.classList.add("hide");
    }, time);
  }

  function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"'>]/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]); });
  }

  /* --------------------------
     Sticky visiting card on scroll (small effect)
  ---------------------------*/
  if (vcSticky) {
    const offset = vcSticky.getBoundingClientRect().top + window.scrollY;
    window.addEventListener("scroll", () => {
      if (window.scrollY > offset - 70) {
        vcSticky.classList.add("vc-fixed");
      } else {
        vcSticky.classList.remove("vc-fixed");
      }
    });
  }

  /* --------------------------
     Small enhancements
  ---------------------------*/
  // make all internal anchor links smooth (if not default)
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href^='#']");
    if (a) {
      // allow default if href == "#"
      const href = a.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // keyboard nav: open drawer with ctrl+m (dev convenience)
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "m") {
      openMobileDrawer();
    }
  });

  /* --------------------------
     Accessibility tweaks
  ---------------------------*/
  // ensure mobileDrawer has role dialog when open
  const observer = new MutationObserver(() => {
    if (!mobileDrawer) return;
    const open = mobileDrawer.classList.contains("open");
    mobileDrawer.setAttribute("aria-hidden", (!open).toString());
    mobileDrawer.setAttribute("role", "dialog");
  });
  if (mobileDrawer) observer.observe(mobileDrawer, { attributes: true, attributeFilter: ["class"] });

  /* --------------------------
     Init
  ---------------------------*/
  // hide toast after initial render in case JS loaded late
  setTimeout(() => {
    if (toast) toast.classList.add("hide");
  }, 9000);

})();