/* ===========================================================
   DARK / LIGHT MODE
=========================================================== */

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "🌙";
} else {
    themeToggle.textContent = "☀️";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
    }
});


/* ===========================================================
   MOBILE MENU TOGGLE
=========================================================== */

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
});


/* ===========================================================
   AUTO YEAR IN FOOTER
=========================================================== */

const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}


/* ===========================================================
   SMOOTH SCROLL (if needed later)
=========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});


/* ===========================================================
   FUTURE EXPANDABLE (Animations / LazyLoad)
=========================================================== */
// Placeholder for future upgrades