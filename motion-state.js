/* A classic script keeps local, double-click previews working without a server. */
globalThis.RootedMotion = Object.freeze({
  progress(top, height, viewport) {
    const travel = height - viewport;
    return travel > 0 ? Math.min(1, Math.max(0, -top / travel)) : 0;
  },
  state(progress, still = false) {
    const p = Math.min(1, Math.max(0, progress));
    return {
      chapter: Math.min(2, Math.floor(p * 3)),
      rotation: still ? -12 : -34 + p * 68,
      lift: still ? 0 : Math.sin(p * Math.PI) * -60,
      travel: still ? 0 : -35 + p * 75,
      tilt: still ? 0 : 12 - p * 24,
      roll: still ? 0 : -5 + p * 10,
      orbit: still ? 0 : p * 220,
      scale: still ? 1 : .87 + Math.sin(p * Math.PI) * .22
    };
  }
});
