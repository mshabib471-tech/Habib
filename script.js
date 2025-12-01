// DARK MODE + MOBILE MENU

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const themeButtons = document.querySelectorAll(".theme-toggle");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".nav-links-mobile");

  // Load stored theme
  try {
    const stored = localStorage.getItem("demo-theme");
    if (stored === "dark") {
      body.classList.add("dark-theme");
      themeButtons.forEach(b => b.textContent = "☀️");
    }
  } catch (e) {}

  // Theme toggle
  themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-theme");
      themeButtons.forEach(b => b.textContent = isDark ? "☀️" : "🌙");
      try {
        localStorage.setItem("demo-theme", isDark ? "dark" : "light");
      } catch (e) {}
    });
  });

  // Mobile nav toggle
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }
});