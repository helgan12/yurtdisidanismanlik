const tabs = Array.from(document.querySelectorAll(".tab"));
const panels = Array.from(document.querySelectorAll(".tab-panel"));
const actionButtons = Array.from(document.querySelectorAll("[data-tab]"));

const activateTab = (tabName) => {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === `panel-${tabName}`);
  });

  const activePanel = document.getElementById(`panel-${tabName}`);
  if (activePanel) {
    activePanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.dataset.tab;
    if (!tabName) return;
    activateTab(tabName);
  });
});

const tabList = document.querySelector(".tab-list");
if (tabList) {
  tabList.addEventListener("keydown", (event) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = tabs.findIndex((tab) => tab.classList.contains("active"));
    if (currentIndex === -1) return;
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];
    activateTab(nextTab.dataset.tab);
    nextTab.focus();
  });
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
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
  });

  // Menü linklerine tıklandığında mobil menüyü kapat
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}
