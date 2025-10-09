/* script.js - menu, smooth scroll, typing, scrollspy, simple mailto form handling */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hireBtns = document.querySelectorAll('.hire-btn');
  const yearEl = document.getElementById('year');

  // Set current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });

  // Close nav on link click (mobile)
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      // close mobile nav
      nav.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 70; // header height
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Typing effect (simple)
  const typedEl = document.getElementById('typed');
  const words = [
    'Frontend Developer',
    'Web Designer',
    'Landing Page Specialist',
    'UI Enthusiast',
  ];
  let wIndex = 0,
    charIndex = 0,
    forward = true;

  function typeLoop() {
    if (!typedEl) return;
    const current = words[wIndex];
    if (forward) {
      charIndex++;
      if (charIndex > current.length) {
        forward = false;
        setTimeout(typeLoop, 900);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        forward = true;
        wIndex = (wIndex + 1) % words.length;
      }
    }
    typedEl.textContent = current.slice(0, charIndex);
    setTimeout(typeLoop, forward ? 80 : 40);
  }
  typeLoop();

  // Scrollspy - update active nav link based on section in view
  const sections = document.querySelectorAll('main section[id]');
  function onScrollSpy() {
    const scrollPos = window.scrollY + 80;
    let currentId = sections[0]?.id || '';
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      if (scrollPos >= top) currentId = sec.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }
  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  // Optional: "Hire me" buttons scroll to contact
  hireBtns.forEach((b) =>
    b.addEventListener('click', (e) => {
      e.preventDefault();
      const contact = document.getElementById('contact');
      if (contact) {
        window.scrollTo({ top: contact.offsetTop - 70, behavior: 'smooth' });
      }
    })
  );
});

// Simple mailto form handler (build mailto link so clients using mail app work)
function submitMailto(form) {
  // No longer needed. Form now uses Formspree for direct email delivery.
}
