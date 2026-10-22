import { enhanceMotion, transitionTheme } from './motion.js';

const root = document.documentElement;
const body = document.body;
const themeButton = document.querySelector('[data-theme-toggle]');
const header = document.querySelector('[data-header]');
const navigation = document.querySelector('.navigation');
const menuButton = document.querySelector('.menu-toggle');
const motion = enhanceMotion(document);

function updateThemeLabel() {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  themeButton.setAttribute('aria-label', `Switch to ${next} theme`);
  themeButton.title = `Switch to ${next} theme`;
  document.querySelector('meta[name="theme-color"]').content = next === 'light' ? '#0c1724' : '#e6edf3';
}

themeButton.addEventListener('click', event => {
  transitionTheme({ document, button: themeButton, event, reduced: motion.reducedMotion.matches, update: () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('edwin-theme', root.dataset.theme); } catch { /* Browsing without storage remains supported. */ }
    updateThemeLabel();
  } });
});
updateThemeLabel();

function closeMenu(returnFocus = false) {
  navigation.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  requestAnimationFrame(() => motion.updateNavigation());
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('menu-open')) closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target)) closeMenu();
});
document.querySelectorAll('.navigation-links a').forEach(link => link.addEventListener('click', () => {
  const wasMobileOpen = navigation.classList.contains('menu-open');
  closeMenu();
  if (wasMobileOpen) menuButton.focus({ preventScroll: true });
}));
matchMedia('(min-width: 601px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

let lastY = window.scrollY;
let direction = 0;
let distance = 0;
let ticking = false;

function updateScroll() {
  const y = Math.max(0, window.scrollY);
  const delta = y - lastY;
  const newDirection = Math.sign(delta);
  if (newDirection && newDirection !== direction) distance = 0;
  if (newDirection) direction = newDirection;
  distance += Math.abs(delta);
  body.classList.toggle('scrolled', y > 70);
  if (y < 90) header.classList.remove('is-hidden');
  else if (distance > 10 && !navigation.classList.contains('menu-open') && !header.querySelector(':focus-visible')) {
    header.classList.toggle('is-hidden', direction > 0);
  }
  lastY = y;
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; }
}, { passive: true });
updateScroll();

const sections = [...document.querySelectorAll('main section[id]')];
if (sections.length) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.querySelectorAll('[data-section]').forEach(link => {
        if (link.dataset.section === entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      motion.updateNavigation();
    }
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

// Native validation and FormSubmit handle delivery/captcha. No simulated success.
const form = document.querySelector('.contact-form');
if (form) {
  form.querySelector('[name="_next"]').value = new URL('/thanks/', window.location.origin).href;
}
