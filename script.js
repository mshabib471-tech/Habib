/* ============================
   Global UI Script
   - Preloader safe hide
   - Theme toggle (localStorage)
   - Mobile menu toggle
   - Reveal on scroll
   - Toast control
   - PWA install prompt handling
   - Auto year
   ============================ */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const preloader = document.getElementById("preloader");
  const themeToggle = document.getElementById("themeToggle");
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const toast = document.getElementById("toast");
  const toastClose = document.getElementById("toastClose");
  const installBtn = document.getElementById("installBtn");
  const yearSpan = document.getElementById("year");

  /* -------------------------
     PRELOADER (SAFE)
  ------------------------- */
  setTimeout(() => {
    if(preloader){
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";
      setTimeout(()=> { preloader.style.display = "none"; }, 350);
    }
  }, 900); // 0.9s to feel snappy

  /* -------------------------
     THEME TOGGLE (persist)
  ------------------------- */
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme === "dark"){
    body.classList.add("dark");
    if(themeToggle) themeToggle.textContent = "☀️";
  } else {
    body.classList.remove("dark");
    if(themeToggle) themeToggle.textContent = "🌙";
  }

  if(themeToggle){
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      const isDark = body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    });
  }

  /* -------------------------
     MOBILE MENU
  ------------------------- */
  if(navToggle && mobileMenu){
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      // accessibility flag
      const open = mobileMenu.classList.contains("open");
      mobileMenu.setAttribute("aria-hidden", !open);
    });
  }

  /* -------------------------
     REVEAL ON SCROLL
  ------------------------- */
  const revealElems = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    revealElems.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top < (window.innerHeight - 80)) el.classList.add("visible");
    });
  };
  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll, { passive: true });

  /* -------------------------
     TOAST
  ------------------------- */
  // show toast 2.4s after load for a short time
  setTimeout(()=> {
    if(toast) toast.classList.add("show");
  }, 2400);

  if(toastClose){
    toastClose.addEventListener("click", () => {
      if(toast) toast.classList.remove("show");
    });
  }

  // auto hide after 8s
  setTimeout(()=> { if(toast) toast.classList.remove("show"); }, 11000);

  /* -------------------------
     PWA INSTALL PROMPT
  ------------------------- */
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // show install button if available
    if(installBtn) installBtn.style.display = "inline-flex";
  });

  if(installBtn){
    installBtn.addEventListener("click", async () => {
      if(deferredPrompt){
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        // optional: track result
        deferredPrompt = null;
      } else {
        // fallback: show instructions to add to home screen
        alert("অ্যাপ ইনস্টল করতে: ব্রাউজারের মেনু → Add to Home screen.");
      }
    });
  }

  /* -------------------------
     AUTO YEAR
  ------------------------- */
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* -------------------------
     Bottom nav active highlight
  ------------------------- */
  const bnLinks = document.querySelectorAll(".bottom-nav a");
  bnLinks.forEach(a => {
    if(a.getAttribute("href") && location.href.includes(a.getAttribute("href"))){
      a.classList.add("active");
    }
  });

  /* -------------------------
     Accessibility helpers (escape to close mobile menu)
  ------------------------- */
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")){
      mobileMenu.classList.remove("open");
    }
  });

}); // DOMContentLoaded end