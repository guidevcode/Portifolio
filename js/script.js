const navbar        = document.querySelector(".navbar");
const hamburger     = document.querySelector(".hamburger");
const navMenu       = document.querySelector(".nav-menu");
const navLinks      = document.querySelectorAll(".nav-link");
const toggleSwitch  = document.querySelector('.theme-switch input[type="checkbox"]');
const langDropdown  = document.getElementById("langDropdown");
const langBtn       = document.getElementById("langBtn");
const langLabel     = document.getElementById("langLabel");
const langOptionEls = document.querySelectorAll(".lang-option");
const myDate        = document.querySelector("#datee");

// ── i18n translations ─────────────────────────────────────────────────────────
const translations = {
  "pt-BR": {
    "nav-about":    "SOBRE",
    "nav-skills":   "HABILIDADES",
    "nav-projects": "PROJETOS",
    "nav-contact":  "CONTATO",
    "hero-cta-projects": "Ver Projetos",
    "hero-cta-cv":       "Baixar CV",
    "about-title":        "Sobre mim",
    "about-bio":          "Cursando Tecnólogo em Análise e Desenvolvimento de Sistemas (1º/2º semestre) na Universidade Uninove, apaixonado por programação, propósito, educação na área de tecnologia e por transformar ideias em realidade por meio do código.",
    "about-lang-native":  "🇧🇷 Português Nativo",
    "about-lang-en":      "🇺🇸 Inglês Avançado",
    "about-soft-label":   "Soft Skills",
    "soft-1": "Comunicação",
    "soft-2": "Trabalho em Equipe",
    "soft-3": "Pensamento Crítico",
    "soft-4": "Adaptabilidade",
    "soft-5": "Gestão do Tempo",
    "soft-6": "Aprendizado Contínuo",
    "soft-7": "Resolução de Problemas",
    "about-aux-label": "Habilidades Auxiliares",
    "about-aux-text":  "Fundamentos de Ciência da Computação, Algoritmos e Lógica de Programação.",
    "about-cv-btn":    "Baixar Currículo",
    "skills-title": "Habilidades",
    "level-adv": "Avançado",
    "level-int": "Intermediário",
    "level-bas": "Básico",
    "projects-title": "Projetos",
    "projects-sub":   "Confira alguns dos meus projetos mais recentes.",
    "proj-btn-site":  "Ver Site",
    "proj1-title": "Doe Sangue Doe Vida",
    "proj1-desc":  "Plataforma web para conectar doadores de sangue a hemocentros, contribuindo com vidas e conscientizando sobre a importância da doação.",
    "proj2-title": "Sistema de Gestão Escolar",
    "proj2-desc":  "Aplicação para cadastro e gerenciamento de alunos com operações completas de CRUD integradas a banco de dados relacional.",
    "proj3-title": "API REST — Gestão de Clientes",
    "proj3-desc":  "API RESTful para gerenciamento de clientes com operações CRUD completas, validação de dados, paginação e documentação automática via Swagger/OpenAPI.",
    "proj4-title": "CRM Microservices",
    "proj4-desc":  "Sistema CRM completo com arquitetura de microsserviços, autenticação JWT, comunicação assíncrona via Kafka e orquestração com Docker.",
    "contact-title": "CONTATO:",
    "contact-sub":   "Entre em contato comigo através das opções abaixo:",
  },
  "en": {
    "nav-about":    "ABOUT",
    "nav-skills":   "SKILLS",
    "nav-projects": "PROJECTS",
    "nav-contact":  "CONTACT",
    "hero-cta-projects": "View Projects",
    "hero-cta-cv":       "Download CV",
    "about-title":        "About me",
    "about-bio":          "Studying Technology in Systems Analysis and Development (1st/2nd semester) at Uninove University, passionate about programming, purpose, technology education and transforming ideas into reality through code.",
    "about-lang-native":  "🇧🇷 Native Portuguese",
    "about-lang-en":      "🇺🇸 Advanced English",
    "about-soft-label":   "Soft Skills",
    "soft-1": "Communication",
    "soft-2": "Teamwork",
    "soft-3": "Critical Thinking",
    "soft-4": "Adaptability",
    "soft-5": "Time Management",
    "soft-6": "Continuous Learning",
    "soft-7": "Problem Solving",
    "about-aux-label": "Additional Skills",
    "about-aux-text":  "Computer Science Fundamentals, Algorithms and Programming Logic.",
    "about-cv-btn":    "Download Resume",
    "skills-title": "Skills",
    "level-adv": "Advanced",
    "level-int": "Intermediate",
    "level-bas": "Basic",
    "projects-title": "Projects",
    "projects-sub":   "Check out some of my recent projects.",
    "proj-btn-site":  "View Site",
    "proj1-title": "Doe Sangue Doe Vida",
    "proj1-desc":  "Web platform to connect blood donors to blood centers, saving lives and raising awareness about the importance of blood donation.",
    "proj2-title": "School Management System",
    "proj2-desc":  "Application for student registration and management with full CRUD operations integrated with a relational database.",
    "proj3-title": "REST API — Client Management",
    "proj3-desc":  "RESTful API for client management with full CRUD operations, data validation, pagination and automatic documentation via Swagger/OpenAPI.",
    "proj4-title": "CRM Microservices",
    "proj4-desc":  "Full CRM system with microservices architecture, JWT authentication, asynchronous communication via Kafka and Docker orchestration.",
    "contact-title": "CONTACT:",
    "contact-sub":   "Get in touch with me through the options below:",
  }
};

function applyTranslations(lang) {
  const dict = translations[lang] || translations["pt-BR"];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
}

// ── Language ──────────────────────────────────────────────────────────────────
function setLanguage() {
  const saved = localStorage.getItem("language") || "pt-BR";
  langLabel.textContent = saved === "en" ? "EN" : "PT-BR";
  langOptionEls.forEach(o => o.classList.toggle("active", o.dataset.value === saved));
  applyTranslations(saved);
}

function selectLanguage(lang) {
  langLabel.textContent = lang === "en" ? "EN" : "PT-BR";
  langOptionEls.forEach(o => o.classList.toggle("active", o.dataset.value === lang));
  langDropdown.classList.remove("open");
  langBtn.setAttribute("aria-expanded", "false");
  localStorage.setItem("language", lang);
  applyTranslations(lang);
}

langBtn.addEventListener("click", () => {
  const isOpen = langDropdown.classList.toggle("open");
  langBtn.setAttribute("aria-expanded", isOpen);
});

langOptionEls.forEach(opt => {
  opt.addEventListener("click", () => selectLanguage(opt.dataset.value));
});

document.addEventListener("click", e => {
  if (!langDropdown.contains(e.target)) {
    langDropdown.classList.remove("open");
    langBtn.setAttribute("aria-expanded", "false");
  }
});

// ── Theme ─────────────────────────────────────────────────────────────────────
function switchTheme(e) {
  const theme = e.target.checked ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function setTheme() {
  const current = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", current);
  toggleSwitch.checked = current === "light";
}

// ── Mobile menu ───────────────────────────────────────────────────────────────
function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", hamburger.classList.contains("active"));
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
}

// ── Smooth scroll ─────────────────────────────────────────────────────────────
function scrollToTarget(e) {
  const target = this.hash;
  const $target = document.querySelector(target);
  if ($target) {
    e.preventDefault();
    window.scrollTo({
      top: $target.getBoundingClientRect().top + window.scrollY,
      behavior: "smooth"
    });
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

// ── Navbar scroll shadow ──────────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// ── Scroll entrance animations ────────────────────────────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);

// ── Init ──────────────────────────────────────────────────────────────────────
myDate.innerHTML = new Date().getFullYear();

hamburger.addEventListener("click", mobileMenu);
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    closeMenu();
    if (link.getAttribute("href").startsWith("#")) scrollToTarget.call(link, e);
  });
});
toggleSwitch.addEventListener("change", switchTheme);

document.addEventListener("DOMContentLoaded", () => {
  setTheme();
  setLanguage();
  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
});

// ── Logo reload animation ─────────────────────────────────────────────────────
document.querySelector(".navbar__logo").addEventListener("click", function (e) {
  e.preventDefault();

  const bar = document.createElement("div");
  bar.className = "reload-bar";
  document.body.appendChild(bar);

  requestAnimationFrame(() => {
    bar.classList.add("run");
    this.classList.add("reloading");
  });

  setTimeout(() => location.reload(), 620);
});
