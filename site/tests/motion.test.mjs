import test from 'node:test';
import assert from 'node:assert/strict';
import { Window } from 'happy-dom';
import { readFile } from 'node:fs/promises';
import { enhanceDisclosure, enhanceMotion, transitionTheme } from '../src/motion.js';
import { homePage } from '../src/templates/home.mjs';

// Isolated DOM state tests, not a rendering/browser substitute. No network.
function fixture(t, { reduced = false } = {}) {
  const win = new Window({ url: 'https://portfolio.test/', settings: {
    disableJavaScriptFileLoading: true, disableCSSFileLoading: true,
    enableJavaScriptEvaluation: false, enableCSSFileLoading: false,
    enableImageFileLoading: false,
  } });
  win.document.write(homePage());
  const queries = new Map();
  win.matchMedia = query => {
    if (!queries.has(query)) {
      const media = new win.EventTarget();
      media.matches = query.includes('prefers-reduced-motion') ? reduced : false;
      queries.set(query, media);
    }
    return queries.get(query);
  };
  // Frames don't paint in this harness. Tests explicitly exercise state changes.
  let frame = 0;
  win.requestAnimationFrame = () => ++frame;
  win.cancelAnimationFrame = () => {};
  const observers = [];
  win.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(element) { this.targets.add(element); }
    unobserve(element) { this.targets.delete(element); }
    disconnect() { this.targets.clear(); }
  };
  win.ResizeObserver = undefined;
  t.after(() => win.happyDOM.close());
  return { win, document: win.document, observers, media: win.matchMedia('(prefers-reduced-motion: reduce)') };
}

function animationStub(element) {
  const records = [];
  element.animate = (frames, options) => {
    const animation = { frames, options, cancelled: false, onfinish: null, finished: Promise.resolve(), cancel() { this.cancelled = true; } };
    records.push(animation);
    return animation;
  };
  return records;
}

test('hero remains accessible and content remains readable before enhancement', t => {
  const { document } = fixture(t);
  assert.equal(document.querySelector('h1').getAttribute('aria-label'), 'Edwin George Shaji');
  assert.deepEqual([...document.querySelectorAll('.hero-word')].map(el => el.textContent), ['Edwin','George','Shaji']);
  assert.equal(document.querySelectorAll('.reveal-pending').length, 0);
  assert.equal(document.querySelectorAll('.project-card').length, 4);
});

test('rapid disclosure reversal finishes in the requested state without trapped height', t => {
  const { document, win, media } = fixture(t);
  const details = document.querySelector('.project-archive');
  const summary = details.querySelector('summary');
  let intermediate = null;
  details.getBoundingClientRect = () => ({ height: intermediate ?? (details.open ? 420 : 80) });
  summary.getBoundingClientRect = () => ({ height: 80 });
  const records = animationStub(details);
  const cleanup = enhanceDisclosure(details, media);
  const click = () => summary.dispatchEvent(new win.MouseEvent('click', { bubbles:true, cancelable:true }));
  click();
  assert.equal(details.open, true);
  intermediate = 180;
  click();
  assert.equal(records[0].cancelled, true);
  assert.equal(records[1].frames[0].height, '180px');
  records[1].onfinish();
  assert.equal(details.open, false);
  assert.equal(details.style.height, '');
  assert.equal(details.style.overflow, '');
  intermediate = null;
  click();
  records[2].onfinish();
  assert.equal(details.open, true);
  cleanup();
});

test('cleaning up a disclosure mid-animation preserves the latest requested state', t => {
  const { document, win, media } = fixture(t);
  const details = document.querySelector('.project-archive');
  animationStub(details);
  const cleanup = enhanceDisclosure(details, media);
  details.querySelector('summary').dispatchEvent(new win.MouseEvent('click', { cancelable:true }));
  cleanup();
  assert.equal(details.open, true);
  assert.equal(details.style.overflow, '');
});

test('reduced motion applies theme immediately without starting any transition', async t => {
  const { document } = fixture(t, { reduced:true });
  let updates = 0;
  document.startViewTransition = () => assert.fail('Reduced motion must not create a snapshot animation');
  await transitionTheme({ document, button:document.querySelector('.theme-toggle'), reduced:true, update:() => updates++ });
  assert.equal(updates, 1);
});

test('unsupported view transitions use the fallback and apply the theme once', async t => {
  const { document } = fixture(t);
  document.startViewTransition = undefined;
  let updates = 0;
  await transitionTheme({ document, button:document.querySelector('.theme-toggle'), reduced:false, update:() => updates++ });
  assert.equal(updates, 1);
  assert.ok(document.documentElement.classList.contains('theme-fade'));
});

test('a rejected theme snapshot still applies the theme and re-enables the control', async t => {
  const { document } = fixture(t);
  animationStub(document.documentElement);
  let updates = 0;
  document.startViewTransition = apply => { apply(); return { ready:Promise.reject(new Error('snapshot unavailable')), skipTransition() {} }; };
  const button = document.querySelector('.theme-toggle');
  await transitionTheme({ document, button, reduced:false, update:() => updates++ });
  assert.equal(updates, 1);
  assert.equal(button.disabled, false);
  assert.equal(document.documentElement.classList.contains('theme-wipe'), false);
});

test('repeated theme clicks cannot overlap snapshots or toggle twice', async t => {
  const { document } = fixture(t);
  animationStub(document.documentElement);
  let updates = 0, ready;
  document.startViewTransition = apply => {
    apply();
    return { ready:new Promise(resolve => { ready = resolve; }), finished:Promise.resolve(), skipTransition() {} };
  };
  const args = { document, button:document.querySelector('.theme-toggle'), reduced:false, update:() => updates++ };
  const running = transitionTheme(args);
  await transitionTheme(args);
  assert.equal(updates, 1);
  ready();
  await running;
  assert.equal(args.button.disabled, false);
});

test('enabling reduced motion reveals pending content and stops visible artwork', t => {
  const { document, win, media, observers } = fixture(t);
  const card = document.querySelector('.project-card');
  card.getBoundingClientRect = () => ({ top:1500 });
  const motion = enhanceMotion(document);
  assert.ok(card.classList.contains('reveal-pending'));
  const art = card.querySelector('.project-art');
  const artworkObserver = observers.find(observer => observer.targets.has(art));
  artworkObserver.callback([{ target:art, isIntersecting:true }]);
  assert.ok(art.classList.contains('is-in-view'));
  media.matches = true;
  media.dispatchEvent(new win.Event('change'));
  assert.equal(document.querySelectorAll('.reveal-pending').length, 0);
  assert.equal(document.querySelectorAll('.is-in-view').length, 0);
  motion.destroy();
});

test('keyboard focus reveals a pending project immediately', t => {
  const { document, win } = fixture(t);
  const card = document.querySelector('.project-card');
  card.getBoundingClientRect = () => ({ top:1500 });
  const motion = enhanceMotion(document);
  card.querySelector('a').dispatchEvent(new win.FocusEvent('focusin', { bubbles:true }));
  assert.equal(card.classList.contains('reveal-pending'), false);
  motion.destroy();
});

test('no observer support leaves every section visible', t => {
  const { document, win } = fixture(t);
  win.IntersectionObserver = undefined;
  const motion = enhanceMotion(document);
  assert.equal(document.querySelectorAll('.reveal-pending').length, 0);
  motion.destroy();
});

test('application integration preserves theme storage, mobile menu, and form destination', async t => {
  const { document, win } = fixture(t, { reduced:true });
  const source = (await readFile(new URL('../src/app.js', import.meta.url), 'utf8')).replace(/^import .*?;\s*/,'');
  const run = new Function('document','window','localStorage','matchMedia','requestAnimationFrame','IntersectionObserver','enhanceMotion','transitionTheme', source + '\nreturn motion;');
  const motion = run(document, win, win.localStorage, win.matchMedia, win.requestAnimationFrame, win.IntersectionObserver, enhanceMotion, transitionTheme);
  const button = document.querySelector('.theme-toggle');
  button.click();
  assert.equal(document.documentElement.dataset.theme, 'light');
  assert.equal(win.localStorage.getItem('edwin-theme'), 'light');
  assert.equal(button.getAttribute('aria-label'), 'Switch to dark theme');
  const menu = document.querySelector('.menu-toggle');
  menu.click();
  assert.equal(menu.getAttribute('aria-expanded'), 'true');
  document.dispatchEvent(new win.KeyboardEvent('keydown', { key:'Escape' }));
  assert.equal(menu.getAttribute('aria-expanded'), 'false');
  assert.equal(document.querySelector('[name="_next"]').value, 'https://portfolio.test/thanks/');
  motion.destroy();
});
