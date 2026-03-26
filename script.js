const contactForm = document.querySelector(".contact-form");

const createFormNotification = (type, message) => {
  if (!contactForm) return;

  const container = contactForm.parentElement;
  if (!container) return;

  // Eski bildirimi temizle
  const existing = container.querySelector(".form-notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = `form-notification form-notification--${type}`;

  const icon = document.createElement("span");
  icon.className = "form-notification-icon";
  icon.textContent = type === "error" ? "!" : "✔";

  const text = document.createElement("p");
  text.textContent = message;

  notification.appendChild(icon);
  notification.appendChild(text);

  container.insertBefore(notification, contactForm);

  // Başarılı bildirimleri bir süre sonra otomatik gizle
  if (type === "success") {
    setTimeout(() => {
      notification.remove();
    }, 6000);
  }
};

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
      createFormNotification("error", "Lütfen tüm alanları eksiksiz doldurun.");
      return;
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      createFormNotification("error", "Lütfen geçerli bir e-posta adresi girin.");
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

    createFormNotification(
      "success",
      "Teşekkürler! Mesajınız başarıyla alındı, en kısa sürede sizinle iletişime geçeceğiz."
    );
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
