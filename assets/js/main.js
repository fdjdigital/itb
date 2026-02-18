/**
 * ITB - Instituto Tarcísio Bisinotto
 * JavaScript Global
 *
 * Funcionalidades:
 * - Menu de navegação responsivo
 * - Smooth scroll
 * - Animações on scroll
 * - Validação de formulários
 * - UTM parameter handling para Calendly
 */

'use strict';

// ============================================================================
// CONSTANTES E CONFIGURAÇÕES
// ============================================================================

const CONFIG = {
  calendlyURL: 'https://calendly.com/institutotarcisiobisinotto-i_x6/visita-ao-instituto-tarcisio-bisinotto',
  animationOffset: 100,
  scrollOffset: 80,
};

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initForms();
  initCalendlyRedirect();
  console.log('🎓 ITB - Site carregado com sucesso!');
});

// ============================================================================
// MENU DE NAVEGAÇÃO MOBILE
// ============================================================================

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (!menuToggle || !nav) return;

  // Função para fechar o menu
  function closeMenu() {
    nav.classList.remove('nav--active');
    menuToggle.classList.remove('menu-toggle--active');
    document.body.classList.remove('menu-open');
  }

  // Toggle menu ao clicar no hambúrguer
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    nav.classList.toggle('nav--active');
    menuToggle.classList.toggle('menu-toggle--active');
    document.body.classList.toggle('menu-open');
  });

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      closeMenu();
    });
  });

  // Fechar menu ao clicar nos botões dentro do menu
  const navButtons = nav.querySelectorAll('.btn');
  navButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      closeMenu();
    });
  });

  // Fechar menu ao clicar fora (no overlay ou fora do menu)
  document.addEventListener('click', function(e) {
    const isMenuOpen = nav.classList.contains('nav--active');
    const clickedInsideNav = nav.contains(e.target);
    const clickedToggle = menuToggle.contains(e.target);

    if (isMenuOpen && !clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });

  // Prevenir que cliques dentro do nav fechem o menu
  nav.addEventListener('click', function(e) {
    e.stopPropagation();
  });
}

// ============================================================================
// SMOOTH SCROLL
// ============================================================================

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Ignore links vazios ou só com #
      if (href === '#' || href === '') return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (!target) return;

      const targetPosition = target.offsetTop - CONFIG.scrollOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// ============================================================================
// ANIMAÇÕES ON SCROLL
// ============================================================================

function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.dataset.animate;
        entry.target.classList.add(`animate-${animation}`);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: `0px 0px -${CONFIG.animationOffset}px 0px`
  });

  elements.forEach(el => observer.observe(el));
}

// ============================================================================
// VALIDAÇÃO DE FORMULÁRIOS
// ============================================================================

function initForms() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (validateForm(this)) {
        submitForm(this);
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('[required]');

  inputs.forEach(input => {
    const errorElement = input.parentElement.querySelector('.form__error');

    // Remover erro anterior
    if (errorElement) {
      errorElement.remove();
    }
    input.classList.remove('form__input--error');

    // Validação
    if (!input.value.trim()) {
      showError(input, 'Este campo é obrigatório');
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      showError(input, 'Por favor, insira um e-mail válido');
      isValid = false;
    } else if (input.type === 'tel' && !isValidPhone(input.value)) {
      showError(input, 'Por favor, insira um telefone válido');
      isValid = false;
    }
  });

  return isValid;
}

function showError(input, message) {
  input.classList.add('form__input--error');

  const errorElement = document.createElement('span');
  errorElement.className = 'form__error';
  errorElement.textContent = message;
  errorElement.style.color = '#ff4444';
  errorElement.style.fontSize = '0.875rem';
  errorElement.style.marginTop = '0.25rem';
  errorElement.style.display = 'block';

  input.parentElement.appendChild(errorElement);
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
}

function submitForm(form) {
  const formData = new FormData(form);
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;

  // Desabilitar botão durante envio
  button.disabled = true;
  button.textContent = 'Enviando...';

  // Aqui você adicionaria a lógica de envio real (AJAX, etc)
  console.log('Formulário submetido:', Object.fromEntries(formData));

  // Simulação de envio
  setTimeout(() => {
    button.disabled = false;
    button.textContent = originalText;
    showSuccessMessage(form);
  }, 1000);
}

function showSuccessMessage(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'form__success';
  successDiv.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
  successDiv.style.cssText = `
    background-color: #7ed957;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    text-align: center;
  `;

  form.appendChild(successDiv);
  form.reset();

  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// ============================================================================
// REDIRECIONAMENTO CALENDLY COM UTM
// ============================================================================

function initCalendlyRedirect() {
  // Verifica se há botões de agendamento na página
  const calendlyButtons = document.querySelectorAll('[data-calendly]');

  if (!calendlyButtons.length) return;

  calendlyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      redirectToCalendly();
    });
  });
}

function redirectToCalendly() {
  // Capturar UTM parameters da URL atual
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  utmKeys.forEach(key => {
    if (urlParams.has(key)) {
      utmParams[key] = urlParams.get(key);
    }
  });

  // Construir URL do Calendly com UTMs
  let calendlyURL = CONFIG.calendlyURL;

  if (Object.keys(utmParams).length > 0) {
    const utmString = Object.entries(utmParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    calendlyURL += (calendlyURL.includes('?') ? '&' : '?') + utmString;
  }

  // Redirecionar
  window.location.href = calendlyURL;
}

// ============================================================================
// UTILITÁRIOS
// ============================================================================

/**
 * Debounce function para otimizar eventos
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function para otimizar scroll events
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Detectar se elemento está visível no viewport
 */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Get query parameter value
 */
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Set cookie
 */
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

/**
 * Get cookie
 */
function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// ============================================================================
// HEADER STICKY ON SCROLL
// ============================================================================

let lastScroll = 0;
const header = document.querySelector('.header');

if (header) {
  window.addEventListener('scroll', throttle(() => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove('header--scrolled');
      return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('header--hidden')) {
      // Scroll down
      header.classList.add('header--hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('header--hidden')) {
      // Scroll up
      header.classList.remove('header--hidden');
    }

    if (currentScroll > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScroll = currentScroll;
  }, 100));
}

// ============================================================================
// LAZY LOADING DE IMAGENS
// ============================================================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll('img.lazy');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================================================
// GOOGLE TAG MANAGER DATA LAYER EVENTS
// ============================================================================

/**
 * Enviar evento customizado para o GTM
 */
function sendGTMEvent(eventName, eventData = {}) {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: eventName,
      ...eventData
    });
    console.log(`📊 GTM Event: ${eventName}`, eventData);
  }
}

// Track clicks em botões de CTA
document.querySelectorAll('[data-gtm-event]').forEach(element => {
  element.addEventListener('click', function() {
    const eventName = this.dataset.gtmEvent;
    const eventLabel = this.dataset.gtmLabel || this.textContent;

    sendGTMEvent(eventName, {
      eventLabel: eventLabel,
      eventCategory: 'CTA',
      eventAction: 'Click'
    });
  });
});

// ============================================================================
// YOUTUBE VIDEO FACADE (LAZY LOADING)
// ============================================================================

document.addEventListener('click', function(e) {
  const facade = e.target.closest('.video-facade');
  if (!facade) return;

  const videoId = facade.dataset.videoId;
  if (!videoId) return;

  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;';

  facade.innerHTML = '';
  facade.style.position = 'relative';
  facade.appendChild(iframe);
});

// ============================================================================
// CONSOLE MESSAGE
// ============================================================================

console.log(`
%c 🎓 Instituto Tarcísio Bisinotto %c
%c Educação Infantil Bilíngue no Belvedere %c
%c 28 anos de tradição e experiência %c
`,
'background: #004aad; color: white; font-size: 16px; padding: 10px;',
'',
'background: #7ed957; color: white; font-size: 14px; padding: 8px;',
'',
'background: #ff914d; color: white; font-size: 12px; padding: 6px;',
''
);

console.log('📞 Contato: (31) 3286-1564 | (31) 99330-0032');
console.log('🌐 Site: https://www.bisinotto.com.br');
console.log('📍 Endereço: Av. Professor Cristóvam dos Santos, 595 - Belvedere, BH');
