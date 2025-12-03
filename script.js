// ==============================
// PRELOADER (SAFE VERSION)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    // ছোট delay দিয়ে smooth hide
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";

      setTimeout(() => {
        preloader.style.display = "none";
      }, 350);
    }, 900);
  }

  // ==============================
  // TOAST NOTIFICATION
  // ==============================
  const toast = document.getElementById("toast");
  const toastClose = document.getElementById("toastClose");

  if (toast) {
    setTimeout(() => {
      toast.classList.add("show");
    }, 2000);

    if (toastClose) {
      toastClose.addEventListener("click", () => {
        toast.classList.remove("show");
      });
    }
  }

  // ==============================
  // DARK / LIGHT THEME
  // ==============================
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("habib-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "🌙";
  } else {
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        themeToggle.textContent = "🌙";
        localStorage.setItem("habib-theme", "dark");
      } else {
        themeToggle.textContent = "☀️";
        localStorage.setItem("habib-theme", "light");
      }
    });
  }

  // ==============================
  // MOBILE MENU
  // ==============================
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    // মেনুর ভেতরের লিঙ্কে ক্লিক করলে মেনু বন্ধ
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  // ==============================
  // FOOTER YEAR
  // ==============================
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ==============================
  // SCROLL REVEAL ANIMATION
  // ==============================
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // fallback
    const onScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
          el.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  // ==============================
  // PWA INSTALL HANDLING
  // ==============================
  const installBtn = document.getElementById("installBtn");
  if (installBtn) {
    // শুরুতে লুকানো থাকবে, ইভেন্ট আসলে দেখাবো
    installBtn.style.display = "none";
  }

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    if (installBtn) {
      installBtn.style.display = "inline-flex";

      installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        // console.log(choice.outcome);
        deferredPrompt = null;

        // চাইলে install হওয়ার পর বাটন লুকিয়ে দিতে পারো
        installBtn.style.display = "none";
      });
    }
  });

  window.addEventListener("appinstalled", () => {
    if (installBtn) {
      installBtn.style.display = "none";
    }
  });

  // ==============================
  // SMOOTH SCROLL FOR INTERNAL LINKS (#)
  // ==============================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});