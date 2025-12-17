// Tahun otomatis di footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Toggle navbar mobile
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    navToggle.classList.toggle("active");
  });

  // Tutup menu saat klik link
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      navToggle.classList.remove("active");
    });
  });
}

// Simulasi submit form
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Terima kasih, pesanan Anda sudah diterima! Kami akan menghubungi segera.");
    contactForm.reset();
  });
}

// Smooth scroll dengan kompensasi tinggi navbar
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const header = document.querySelector('.header');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    const headerHeight = header.offsetHeight;
    const targetPosition = targetEl.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});
