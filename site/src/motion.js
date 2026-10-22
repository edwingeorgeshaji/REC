const easeOut = 'cubic-bezier(.16, 1, .3, 1)';
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** A circular theme reveal with a colour-fade fallback. The update runs once. */
export async function transitionTheme({ document, button, event, update, reduced }) {
  if (button.disabled) return;
  const root = document.documentElement;
  const win = document.defaultView;
  if (reduced) { update(); return; }

  if (!document.startViewTransition || !root.animate) {
    root.classList.add('theme-fade');
    update();
    win.setTimeout(() => root.classList.remove('theme-fade'), 650);
    return;
  }

  button.disabled = true;
  root.classList.add('theme-wipe');
  let applied = false;
  let transition;
  const apply = () => { if (!applied) { update(); applied = true; } };
  try {
    const box = button.getBoundingClientRect();
    const x = event?.clientX || box.left + box.width / 2;
    const y = event?.clientY || box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, win.innerWidth - x), Math.max(y, win.innerHeight - y));
    transition = document.startViewTransition(apply);
    await transition.ready;
    const animation = root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] }, {
      duration: 750, easing: easeOut, pseudoElement: '::view-transition-new(root)',
    });
    await animation.finished;
    await transition.finished;
  } catch {
    // A browser may support snapshots but reject pseudo-element animation.
    // The selected theme must still be applied, with no second toggle.
    transition?.skipTransition();
    apply();
  } finally {
    root.classList.remove('theme-wipe');
    button.disabled = false;
  }
}

/** Animate both opening and closing; repeated clicks reverse from current height. */
export function enhanceDisclosure(details, reducedMotion) {
  const summary = details.querySelector('summary');
  if (!summary || !details.animate) return () => {};
  const win = details.ownerDocument.defaultView;
  let animation = null;
  let desiredOpen = details.open;

  function finish() {
    const previous = animation;
    animation = null;
    if (previous) { previous.onfinish = null; previous.cancel(); }
    details.open = desiredOpen;
    details.style.removeProperty('height');
    details.style.removeProperty('overflow');
  }

  function click(event) {
    if (reducedMotion.matches) return;
    event.preventDefault();
    const startHeight = details.getBoundingClientRect().height;
    desiredOpen = !desiredOpen;
    if (animation) { animation.onfinish = null; animation.cancel(); }
    details.open = true;
    details.style.removeProperty('height');
    const borders = win.getComputedStyle(details);
    const borderHeight = (parseFloat(borders.borderTopWidth) || 0) + (parseFloat(borders.borderBottomWidth) || 0);
    const endHeight = desiredOpen ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + borderHeight;
    details.style.overflow = 'hidden';
    animation = details.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], {
      duration: 440, easing: easeOut, fill: 'both',
    });
    animation.onfinish = finish;
  }
  summary.addEventListener('click', click);
  return () => { summary.removeEventListener('click', click); finish(); };
}

function setupReveals(document, signal) {
  const win = document.defaultView;
  if (!win.IntersectionObserver) return () => {};
  const targets = [...document.querySelectorAll([
    '.section > .section-label', '.about-heading', '.about-copy', '.section-heading',
    '.skill-group', '.learning-note', '.project-card', '.project-archive',
    '.experience-item', '.education-layout > h2', '.education-item', '.honours',
    '.certificate', '.contact-copy', '.contact-form', '.project-story > section',
    '.next-project', '.footer-name', '.footer-bottom',
  ].join(','))];

  const reveal = element => {
    element.classList.remove('reveal-pending');
    element.classList.add('is-revealed');
  };
  const observer = new win.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { reveal(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });

  targets.forEach(element => {
    element.dataset.reveal = element.matches('.section-heading, .about-heading, h2') ? 'heading' : 'content';
    if (element.matches('.skill-group, .certificate')) {
      const index = [...element.parentElement.children].indexOf(element);
      element.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 85}ms`);
    }
    // Content already on screen, including an incoming hash target, stays visible.
    if (element.getBoundingClientRect().top < win.innerHeight - 35) reveal(element);
    else { element.classList.add('reveal-pending'); observer.observe(element); }
  });
  document.addEventListener('focusin', event => {
    const element = event.target.closest?.('[data-reveal]');
    if (element) { reveal(element); observer.unobserve(element); }
  }, { signal });
  return () => { observer.disconnect(); targets.forEach(reveal); };
}

function setupHero(document, signal) {
  const hero = document.querySelector('.hero');
  if (!hero) return () => {};
  const win = document.defaultView;
  const finePointer = win.matchMedia('(hover: hover) and (pointer: fine)');
  let height = hero.offsetHeight || win.innerHeight;
  let targetX = 0, targetY = 0, x = 0, y = 0, scroll = win.scrollY;
  let frame = 0;

  function render() {
    frame = 0;
    if (document.hidden) return;
    x += (targetX - x) * .085;
    y += (targetY - y) * .085;
    const targetScroll = clamp(win.scrollY, 0, height);
    scroll += (targetScroll - scroll) * .14;
    hero.style.setProperty('--hero-x', `${x.toFixed(2)}px`);
    hero.style.setProperty('--hero-pointer-y', `${y.toFixed(2)}px`);
    hero.style.setProperty('--hero-scroll-y', `${(scroll * .15).toFixed(2)}px`);
    hero.style.setProperty('--title-y', `${(scroll * .2).toFixed(2)}px`);
    hero.style.setProperty('--title-opacity', String(clamp(1 - scroll / height * 1.45, 0, 1)));
    if (Math.abs(targetX - x) > .05 || Math.abs(targetY - y) > .05 || Math.abs(targetScroll - scroll) > .1) schedule();
  }
  function schedule() { if (!frame && !document.hidden) frame = win.requestAnimationFrame(render); }
  hero.addEventListener('pointermove', event => {
    if (!finePointer.matches) return;
    targetX = (event.clientX / win.innerWidth - .5) * -16;
    targetY = (event.clientY / win.innerHeight - .5) * -12;
    schedule();
  }, { passive: true, signal });
  hero.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; schedule(); }, { signal });
  win.addEventListener('scroll', schedule, { passive: true, signal });
  win.addEventListener('resize', () => { height = hero.offsetHeight || win.innerHeight; schedule(); }, { passive: true, signal });
  document.addEventListener('visibilitychange', schedule, { signal });
  schedule();
  return () => {
    win.cancelAnimationFrame(frame);
    ['--hero-x', '--hero-pointer-y', '--hero-scroll-y', '--title-y', '--title-opacity'].forEach(name => hero.style.removeProperty(name));
  };
}

function setupArtwork(document, signal) {
  const win = document.defaultView;
  const surfaces = [...document.querySelectorAll('.project-art, .detail-visual')];
  const observer = win.IntersectionObserver ? new win.IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-in-view', entry.isIntersecting));
  }, { threshold: .12 }) : null;
  surfaces.forEach(surface => observer ? observer.observe(surface) : surface.classList.add('is-in-view'));
  const finePointer = win.matchMedia('(hover: hover) and (pointer: fine)');
  const cleanupCards = [];
  document.querySelectorAll('.project-art').forEach(card => {
    let frame = 0, rectangle, latest;
    const reset = () => {
      win.cancelAnimationFrame(frame); frame = 0; rectangle = null;
      ['--tilt-x', '--tilt-y', '--spot-x', '--spot-y'].forEach(name => card.style.removeProperty(name));
    };
    card.addEventListener('pointerenter', () => { rectangle = card.getBoundingClientRect(); }, { signal });
    card.addEventListener('pointermove', event => {
      if (!finePointer.matches) return;
      latest = event;
      if (frame) return;
      frame = win.requestAnimationFrame(() => {
        frame = 0;
        rectangle ||= card.getBoundingClientRect();
        const x = clamp((latest.clientX - rectangle.left) / rectangle.width, 0, 1);
        const y = clamp((latest.clientY - rectangle.top) / rectangle.height, 0, 1);
        card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
        card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
        card.style.setProperty('--spot-x', `${x * 100}%`);
        card.style.setProperty('--spot-y', `${y * 100}%`);
      });
    }, { passive: true, signal });
    card.addEventListener('pointerleave', reset, { signal });
    win.addEventListener('scroll', reset, { passive: true, signal });
    cleanupCards.push(reset);
  });
  return () => { observer?.disconnect(); surfaces.forEach(surface => surface.classList.remove('is-in-view')); cleanupCards.forEach(cleanup => cleanup()); };
}

export function enhanceMotion(document) {
  const win = document.defaultView;
  const reducedMotion = win.matchMedia('(prefers-reduced-motion: reduce)');
  const navigation = document.querySelector('.navigation');
  const links = document.querySelector('.navigation-links');
  const indicator = links?.querySelector('.nav-indicator');
  let stopEffects = () => {};

  const updateNavigation = (target = links?.querySelector('[aria-current]')) => {
    if (!indicator || !links) return;
    if (!target) { links.style.setProperty('--nav-opacity', '0'); return; }
    links.style.setProperty('--nav-x', `${target.offsetLeft}px`);
    links.style.setProperty('--nav-y', `${target.offsetTop}px`);
    links.style.setProperty('--nav-width', `${target.offsetWidth}px`);
    links.style.setProperty('--nav-height', `${target.offsetHeight}px`);
    links.style.setProperty('--nav-opacity', '1');
  };
  const globalEvents = new win.AbortController();
  links?.querySelectorAll('a').forEach(link => {
    link.addEventListener('pointerenter', () => updateNavigation(link), { signal: globalEvents.signal });
    link.addEventListener('focus', () => updateNavigation(link), { signal: globalEvents.signal });
  });
  links?.addEventListener('pointerleave', () => updateNavigation(), { signal: globalEvents.signal });
  links?.addEventListener('focusout', () => updateNavigation(), { signal: globalEvents.signal });
  const resize = win.ResizeObserver && links ? new win.ResizeObserver(() => updateNavigation()) : null;
  if (resize) resize.observe(links);

  let progressFrame = 0;
  const updateProgress = () => {
    progressFrame = 0;
    const max = document.documentElement.scrollHeight - win.innerHeight;
    navigation?.style.setProperty('--reading-progress', String(max > 0 ? clamp(win.scrollY / max, 0, 1) : 0));
  };
  win.addEventListener('scroll', () => { if (!progressFrame) progressFrame = win.requestAnimationFrame(updateProgress); }, { passive: true, signal: globalEvents.signal });

  function syncMotionPreference() {
    stopEffects();
    if (reducedMotion.matches) { stopEffects = () => {}; return; }
    const controller = new win.AbortController();
    const cleanups = [setupReveals(document, controller.signal), setupHero(document, controller.signal), setupArtwork(document, controller.signal)];
    document.querySelectorAll('.experience-item, .project-archive').forEach(details => cleanups.push(enhanceDisclosure(details, reducedMotion)));
    stopEffects = () => { controller.abort(); cleanups.forEach(cleanup => cleanup()); };
  }
  reducedMotion.addEventListener('change', syncMotionPreference);
  syncMotionPreference();
  updateProgress();
  updateNavigation();
  return {
    reducedMotion,
    updateNavigation,
    destroy() { stopEffects(); globalEvents.abort(); resize?.disconnect(); win.cancelAnimationFrame(progressFrame); reducedMotion.removeEventListener('change', syncMotionPreference); },
  };
}
