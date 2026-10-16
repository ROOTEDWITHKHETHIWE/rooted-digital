/* Shared motion for the Work and Services pages. */
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const toggle = document.querySelector('.motion-toggle');
  const cases = [...document.querySelectorAll('.case-study')];
  const process = document.querySelector('.process');
  let paused = false, frame = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  function draw() {
    frame = 0;
    const still = paused || reduced.matches;
    const travel = root.scrollHeight - innerHeight;
    const progress = travel > 0 ? clamp(scrollY/travel) : 0;
    window.RootedLandscape?.update(progress,still);
    root.style.setProperty('--background-shift', `${still ? 0 : Math.min(scrollY*.08,240)}px`);
    cases.forEach(item => {
      const bounds = item.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > innerHeight) return;
      const position = clamp((innerHeight-bounds.top)/(innerHeight+bounds.height));
      item.style.setProperty('--case-rise', `${still ? 0 : (position-.5)*-32}px`);
      item.style.setProperty('--case-angle', `${still ? 0 : (position-.5)*6}deg`);
    });
    if (process) {
      const bounds = process.getBoundingClientRect();
      process.style.setProperty('--process-progress', still ? 1 : clamp((innerHeight-bounds.top)/(innerHeight*.8)));
    }
  }
  function requestDraw() { if (!frame) frame=requestAnimationFrame(draw); }
  function sync() {
    const still=paused||reduced.matches;
    root.classList.toggle('motion-paused',still);
    if (toggle) {
      toggle.disabled=reduced.matches;
      toggle.setAttribute('aria-pressed',String(still));
      toggle.textContent=reduced.matches?'Reduced motion enabled':still?'Motion paused · resume':'Pause motion';
    }
    document.querySelectorAll('.case-visual').forEach(el=>{
      el.style.setProperty('--hover-x','0deg');el.style.setProperty('--hover-y','0deg');
    });
    requestDraw();
  }
  toggle?.addEventListener('click',()=>{paused=!paused;sync();});
  reduced.addEventListener('change',sync);
  addEventListener('scroll',requestDraw,{passive:true});
  addEventListener('resize',requestDraw,{passive:true});
  document.querySelectorAll('.case-visual').forEach(el=>{
    el.addEventListener('pointermove',event=>{
      if(paused||reduced.matches||!fine.matches)return;
      const box=el.getBoundingClientRect();
      el.style.setProperty('--hover-x',`${((event.clientY-box.top)/box.height-.5)*-5}deg`);
      el.style.setProperty('--hover-y',`${((event.clientX-box.left)/box.width-.5)*6}deg`);
    },{passive:true});
    el.addEventListener('pointerleave',()=>{
      el.style.setProperty('--hover-x','0deg');el.style.setProperty('--hover-y','0deg');
    });
  });
  document.addEventListener('visibilitychange',()=>root.classList.toggle('page-hidden',document.hidden));
  sync();
})();
