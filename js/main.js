/* =============================================
   Berry Chen — Personal Branding Website
   JavaScript: Scroll reveal, Navbar, Mobile menu
   ============================================= */

(function () {
  'use strict';

  // --- Scroll Reveal (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    revealElements.forEach((el) => el.classList.add('active'));
  }

  // --- Navbar scroll effect ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Mobile menu ---
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('navOverlay');
  const overlayLinks = overlay.querySelectorAll('.nav__overlay-link');

  function toggleMenu() {
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    overlay.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);

  overlayLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });

  // --- Contact email form (Formspree) ---
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('.contact__submit');
      submitBtn.disabled = true;
      submitBtn.textContent = '送出中...';

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            formMsg.textContent = '感謝你的留言！我會盡快與你聯繫';
            formMsg.style.color = '#2E7D32';
            contactForm.reset();
          } else {
            formMsg.textContent = '送出失敗，請稍後再試';
            formMsg.style.color = '#B03A2E';
          }
        })
        .catch(function () {
          formMsg.textContent = '網路錯誤，請稍後再試';
          formMsg.style.color = '#B03A2E';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = '送出';
          setTimeout(function () {
            formMsg.textContent = '';
          }, 5000);
        });
    });
  }
})();
