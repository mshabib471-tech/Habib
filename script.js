/* ============================================
   HABIB BUSINESS APP — MAIN SCRIPT
   Handles:
   ✔ Dark / Light Mode Switch
   ✔ Mobile Menu Toggle
============================================ */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const themeBtns = document.querySelectorAll(".theme-toggle");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".nav-links-mobile");

  /* ----------------------------
       DARK / LIGHT MODE
  ---------------------------- */
  let darkMode = false;

  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      darkMode = !darkMode;

      if (darkMode) {
        body.classList.add("dark");
        themeBtns.forEach(b => b.textContent = "☀️");
      } else {
        body.classList.remove("dark");
        themeBtns.forEach(b => b.textContent = "🌙");
      }
    });
  });

  /* ----------------------------
       MOBILE MENU TOGGLE
  ---------------------------- */
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

});