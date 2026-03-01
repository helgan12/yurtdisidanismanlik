const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Form validasyonu
    const formData = new FormData(contactForm);
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const phone = formData.get("phone")?.trim();
    const message = formData.get("message")?.trim();
    
    // Basit validasyon
    if (!name || !email || !phone || !message) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    
    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    
    // XSS koruması - HTML karakterlerini temizle
    const sanitize = (str) => {
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    };
    
    // Form verilerini güvenli şekilde işle (gerçek uygulamada backend'e gönderilir)
    console.log("Form gönderildi:", {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone),
      message: sanitize(message)
    });
    
    alert("Teşekkürler! En kısa sürede sizinle iletişime geçeceğiz.");
    contactForm.reset();
  });
}

// Mobil menü toggle
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    // ARIA attribute güncelle
    const isOpen = nav.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Menü linklerine tıklandığında mobil menüyü kapat
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
  
  // ESC tuşu ile menüyü kapat
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });
}
