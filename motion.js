(() => {
  const journey = document.querySelector('.motion-journey');
  if (!journey || !globalThis.RootedMotion) return;
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const toggle = document.querySelector('.motion-toggle');
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const screens = [...document.querySelectorAll('[data-screen]')];
  const tabs = [...document.querySelectorAll('[data-go]')];
  const names = ['Dream Stewardship', 'Rooted Market Intelligence', 'Woman Restored'];
  let paused = false;
  let frame = 0;
  let activeChapter = -1;
  let forcedChapter = null;
  let previousScroll = window.scrollY;

  function paint() {
    frame = 0;
    const rect = journey.getBoundingClientRect();
    const progress = RootedMotion.progress(rect.top, rect.height, window.innerHeight);
    const state = RootedMotion.state(progress, paused || reduced.matches);
    root.style.setProperty('--scene-turn', `${state.rotation}deg`);
    root.style.setProperty('--scene-lift', `${state.lift}px`);
    root.style.setProperty('--scene-orbit', `${state.orbit}deg`);
    root.style.setProperty('--scene-scale', state.scale);
    root.style.setProperty('--scene-travel', `${state.travel}px`);
    root.style.setProperty('--scene-tilt', `${state.tilt}deg`);
    root.style.setProperty('--scene-roll', `${state.roll}deg`);
    root.style.setProperty('--journey-progress', progress);
    root.style.setProperty('--background-shift', `${(paused || reduced.matches) ? 0 : Math.min(window.scrollY * .065, 200)}px`);
    const pageTravel = document.documentElement.scrollHeight - window.innerHeight;
    window.RootedLandscape?.update(pageTravel > 0 ? window.scrollY / pageTravel : 0, paused || reduced.matches);
    const chapter = forcedChapter ?? state.chapter;
    if (chapter === activeChapter) return;
    activeChapter = chapter;
    chapters.forEach((element, i) => {
      element.classList.toggle('is-current', i === chapter);
      element.inert = i !== chapter;
      element.setAttribute('aria-hidden', String(i !== chapter));
    });
    screens.forEach((element, i) => {
      element.classList.toggle('is-current', i === chapter);
      element.setAttribute('aria-hidden', String(i !== chapter));
    });
    tabs.forEach((element, i) => element.setAttribute('aria-pressed', String(i === chapter)));
    document.querySelector('[data-scene-label]').textContent = names[chapter];
    document.querySelector('.scene-count').textContent = `0${chapter + 1} — 03`;
  }

  function requestPaint() {
    if (!frame) frame = requestAnimationFrame(paint);
  }

  function syncMotion() {
    const still = paused || reduced.matches;
    root.classList.toggle('motion-paused', still);
    toggle.setAttribute('aria-pressed', String(still));
    toggle.textContent = still ? 'Motion paused · resume' : 'Pause motion Ⅱ';
    if (reduced.matches) toggle.textContent = 'Reduced motion enabled';
    toggle.disabled = reduced.matches;
    root.style.setProperty('--pointer-x', '0deg');
    root.style.setProperty('--pointer-y', '0deg');
    requestPaint();
  }

  toggle.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reduced.addEventListener('change', syncMotion);
  window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollY - previousScroll) > 2) forcedChapter = null;
    previousScroll = window.scrollY;
    requestPaint();
  }, { passive: true });
  window.addEventListener('resize', requestPaint, { passive: true });
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    // Selection does not move the document or take focus from keyboard visitors.
    forcedChapter = Number(tab.dataset.go);
    requestPaint();
  }));
  const viewport = document.querySelector('.scene-viewport');
  viewport.addEventListener('pointermove', (event) => {
    if (paused || reduced.matches || !finePointer.matches) return;
    const rect = viewport.getBoundingClientRect();
    root.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
    root.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height - .5) * -5}deg`);
  }, { passive: true });
  viewport.addEventListener('pointerleave', () => {
    root.style.setProperty('--pointer-x', '0deg');
    root.style.setProperty('--pointer-y', '0deg');
  });
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('page-hidden', document.hidden);
  });
  syncMotion();
})();
