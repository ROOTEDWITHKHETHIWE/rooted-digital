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
      rotation: still ? -12 : -19 + p * 34,
      lift: still ? 0 : Math.sin(p * Math.PI) * -28,
      orbit: still ? 0 : p * 115,
      scale: still ? 1 : 1 + Math.sin(p * Math.PI) * .055
    };
  }
});
