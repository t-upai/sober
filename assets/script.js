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
// Submit form ke WhatsApp
const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const orderText = document.getElementById("order").value.trim();

    if (!nama || !phone) {
      alert("Mohon lengkapi Nama dan No. HP / WhatsApp.");
      return;
    }

    // Susun pesan
    let pesan = `Halo Kopi Sober,%0A%0A`;
    pesan += `Nama: ${nama}%0A`;
    pesan += `No. HP: ${phone}%0A`;
    pesan += `Pesanan: ${orderText || "-"}%0A%0A`;
    pesan += `Dikirim dari website Kopi Sober.`;

    // Nomor WhatsApp tujuan (format internasional tanpa + dan tanpa 0 depan)
    const tujuan = "6285837564072";

    const waUrl = `https://wa.me/${tujuan}?text=${pesan}`;

    // Notifikasi dulu
    alert("Terima kasih, Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan.");

    // Buka WhatsApp di tab baru
    window.open(waUrl, "_blank");

    // Reset form
    orderForm.reset();
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

    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = targetEl.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

/* ==========================
   MODAL DETAIL MENU (FULLSCREEN)
   ========================== */

const menuModal = document.getElementById("menuModal");
const closeMenuModal = document.getElementById("closeMenuModal");
const closeMenuModal2 = document.getElementById("closeMenuModal2");

const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const modalList = document.getElementById("modalList");

const paymentCard = document.getElementById("paymentCard");
const togglePaymentBtn = document.getElementById("togglePayment");

const menuCards = document.querySelectorAll(".menu-open");
let activeCard = null;

function openMenuModalFromCard(card) {
  if (!menuModal) return;

  const title = card.dataset.title || "";
  const price = card.dataset.price || "";
  const desc = card.dataset.desc || "";
  const imgClass = card.dataset.img || "";
  const items = (card.dataset.items || "").split("|").map(s => s.trim()).filter(Boolean);

  if (modalTitle) modalTitle.textContent = title;
  if (modalPrice) modalPrice.textContent = price;
  if (modalDesc) modalDesc.textContent = desc;

  if (modalImg) modalImg.className = "menu-modal-img " + imgClass;

  if (modalList) {
    modalList.innerHTML = "";
    items.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      modalList.appendChild(li);
    });
  }

  // reset payment card setiap buka modal
  if (paymentCard) paymentCard.classList.remove("show");
  if (togglePaymentBtn) togglePaymentBtn.textContent = "Pesan Sekarang";

  // tandai kartu yang aktif
  if (activeCard) activeCard.classList.remove("menu-active");
  activeCard = card;
  activeCard.classList.add("menu-active");

  menuModal.showModal();
}

menuCards.forEach((card) => {
  card.addEventListener("click", () => openMenuModalFromCard(card));
});

// Toggle card pembayaran
if (togglePaymentBtn && paymentCard){
  togglePaymentBtn.addEventListener("click", () => {
    const isShown = paymentCard.classList.toggle("show");
    togglePaymentBtn.textContent = isShown ? "Sembunyikan Pembayaran" : "Pesan Sekarang";
  });
}

function closeMenuModalFn() {
  if (menuModal && menuModal.open) {
    menuModal.close();
  }
  if (activeCard) {
    activeCard.classList.remove("menu-active");
    activeCard = null;
  }
  if (paymentCard) {
    paymentCard.classList.remove("show");
  }
  if (togglePaymentBtn) {
    togglePaymentBtn.textContent = "Pesan Sekarang";
  }
}

if (closeMenuModal) closeMenuModal.addEventListener("click", closeMenuModalFn);
if (closeMenuModal2) closeMenuModal2.addEventListener("click", closeMenuModalFn);

// Klik area kosong di dalam dialog (backdrop internal) untuk tutup
if (menuModal) {
  menuModal.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      closeMenuModalFn();
    }
  });
}
