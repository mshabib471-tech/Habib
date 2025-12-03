// ==============================
// PRELOADER (safe)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 300);
  }, 1200); // 1.2 sec
});

// ==============================
// THEME (Light / Dark)
// ==============================
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

(function initTheme() {
  if (!themeToggle) return;

  const saved = localStorage.getItem("habib-theme");
  if (saved === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    if (isDark) {
      localStorage.setItem("habib-theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("habib-theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
})();

// ==============================
// MOBILE MENU
// ==============================
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  // মেনু থেকে লিঙ্ক ক্লিক করলে মেনু বন্ধ
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
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // পুরানো ব্রাউজারের জন্য
  revealEls.forEach((el) => el.classList.add("visible"));
}

// ==============================
// TOAST NOTIFICATION
// ==============================
const toast = document.getElementById("toast");
const toastClose = document.getElementById("toastClose");
let toastShown = false;

function showToast() {
  if (!toast || toastShown) return;
  toastShown = true;
  toast.classList.add("show");
}

// ৩ সেকেন্ড পরে টোস্ট দেখাও
setTimeout(showToast, 3000);

// ক্লোজ বাটন
if (toastClose && toast) {
  toastClose.addEventListener("click", () => {
    toast.classList.remove("show");
  });
}

// প্রথমবার স্ক্রল করলে টোস্ট দেখানো (যদি আগেই না দেখা হয়)
let scrolledOnce = false;
window.addEventListener("scroll", () => {
  if (!scrolledOnce) {
    scrolledOnce = true;
    showToast();
  }
});

// ==============================
// PWA INSTALL BUTTON
// ==============================
let deferredPrompt = null;
const installBtn = document.getElementById("installBtn");

// শুরুতে লুকানো থাকে
if (installBtn) {
  installBtn.style.display = "none";
}

window.addEventListener("beforeinstallprompt", (e) => {
  // ডিফল্ট ব্যানার বন্ধ
  e.preventDefault();
  deferredPrompt = e;

  if (installBtn) {
    installBtn.style.display = "inline-flex";
  }
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) {
      // ইভেন্ট না থাকলে ব্রাউজারের নিজের A2HS মেনু দেখাতে বলো
      alert("Browser menu থেকে 'Add to Home Screen' সিলেক্ট করুন।");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("PWA installed");
    }
    deferredPrompt = null;
    installBtn.style.display = "none";
  });
}

// ==============================
// TELEGRAM SUPPORT CARD CLICK
// ==============================
const telegramSupport = document.getElementById("telegramSupport");
if (telegramSupport) {
  telegramSupport.addEventListener("click", () => {
    window.open("https://t.me/H_A_B_I_B_Top_1", "_blank");
  });
}

// ==============================
// BOTTOM NAV ACTIVE STATE
// ==============================
const bottomNavLinks = document.querySelectorAll(".bottom-nav a");
if (bottomNavLinks.length) {
  const path = window.location.pathname.split("/").pop() || "index.html";

  bottomNavLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (
      (path === "" && href.includes("index")) ||
      path === href ||
      (path === "index.html" && href === "#")
    ) {
      link.classList.add("active");
    }
  });
}

// ==============================
// CONTACT FORM SUCCESS MESSAGE
// (Formspree redirect বন্ধ করতে চাইলে এখানে কাস্টম হ্যান্ডলিং করা যাবে)
// ==============================
const contactForm = document.querySelector("form[action^='https://formspree.io']");
if (contactForm) {
  contactForm.addEventListener("submit", () => {
    // সাবমিটের আগে বাটনের টেক্সট পরিবর্তন
    const btn = contactForm.querySelector("button[type='submit']");
    if (btn) {
      btn.textContent = "Sending...";
      btn.disabled = true;
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = "Send";
      }, 4000);
    }
  });
}