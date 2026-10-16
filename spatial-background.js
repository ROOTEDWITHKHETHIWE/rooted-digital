/* A local, shaded 3D mesh projected onto Canvas. No downloads or video. */
(() => {
  const canvas = document.querySelector('.spatial-background');
  const context = canvas?.getContext('2d', { alpha: true });
  if (!context) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 1, height = 1, progress = 0, target = 0;
  let paused = reduced.matches, frame = 0, last = 0, clock = 0;
  const normalize = (v) => {
    const length = Math.hypot(...v) || 1;
    return v.map((n) => n / length);
  };
  const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
  const subtract = (a, b) => a.map((v, i) => v - b[i]);
  const centerline = (t) => {
    const r = 1.02 + .3 * Math.cos(3 * t);
    return [r * Math.cos(2 * t), r * Math.sin(2 * t), .45 * Math.sin(3 * t)];
  };
  const mobile = window.innerWidth < 700;
  const segments = mobile ? 96 : 160, sides = mobile ? 8 : 12;
  const vertices = [], faces = [];
  for (let i = 0; i < segments; i++) {
    const t = i / segments * Math.PI * 2;
    const c = centerline(t);
    const tangent = normalize(subtract(centerline(t + .001), centerline(t - .001)));
    const normal = normalize(cross(tangent, [0, 0, 1]));
    const binormal = normalize(cross(tangent, normal));
    for (let j = 0; j < sides; j++) {
      const a = j / sides * Math.PI * 2;
      vertices.push(c.map((v,k) => v + .14 * (normal[k] * Math.cos(a) + binormal[k] * Math.sin(a))));
      faces.push([i*sides+j, ((i+1)%segments)*sides+j, ((i+1)%segments)*sides+(j+1)%sides, i*sides+(j+1)%sides]);
    }
  }
  function size() {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }
  function draw() {
    const p = paused ? 0 : progress;
    const yaw = -.6 + p * Math.PI * 2.4 + (paused ? 0 : clock * .055);
    const pitch = .35 + p * 1.4;
    const roll = -.4 + p * 1.7;
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch), cz = Math.cos(roll), sz = Math.sin(roll);
    const points = vertices.map(([x,y,z]) => {
      const a = x*cy+z*sy, b = -x*sy+z*cy;
      const d = y*cx-b*sx, e = y*sx+b*cx;
      return [a*cz-d*sz, a*sz+d*cz, e];
    });
    const scale = Math.min(width * .46, height * .58) * (1 + Math.sin(p * Math.PI * 2) * .2);
    const centerX = width * (.79 - .23 * Math.sin(p * Math.PI));
    const centerY = height * (.44 + .12 * Math.sin(p * Math.PI * 2));
    const camera = 4.8 - p * .9;
    const projected = points.map(([x,y,z]) => {
      const perspective = 4 / (camera-z);
      return [centerX+x*scale*perspective, centerY+y*scale*perspective];
    });
    const ordered = faces.map((indices) => ({indices, depth: indices.reduce((sum, i) => sum + points[i][2], 0) / 4})).sort((a,b) => a.depth-b.depth);
    context.clearRect(0,0,width,height);
    const light = normalize([-.7,-.6,1]);
    for (const {indices} of ordered) {
      const [a,b,c] = indices.map((i) => points[i]);
      const normal = normalize(cross(subtract(b,a), subtract(c,a)));
      // Both sides are shaded; the depth-sorted surface provides occlusion.
      const diffuse = Math.abs(normal.reduce((sum,n,k) => sum+n*light[k],0));
      const shine = Math.pow(diffuse, 14);
      const intensity = .21 + diffuse * .57 + shine * .36;
      const color = [206,177,112].map((n) => Math.min(255,Math.round(n * intensity + shine * 35)));
      context.fillStyle = `rgb(${color.join(',')})`;
      context.strokeStyle = context.fillStyle;
      context.lineWidth = .45;
      context.beginPath();
      indices.forEach((index,k) => {
        const [x,y] = projected[index];
        if (k===0) context.moveTo(x,y); else context.lineTo(x,y);
      });
      context.closePath(); context.fill(); context.stroke();
    }
  }
  function tick(now) {
    frame = 0;
    if (paused || document.hidden) { last = 0; return; }
    const delta = last ? Math.min((now-last)/1000, .06) : 0;
    // Limit raster work to about 30 fps; scroll changes are eased between frames.
    if (!last || now-last >= 30) {
      clock += delta;
      progress += (target-progress) * .16;
      last = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function start() {
    if (!paused && !document.hidden && !frame) frame = requestAnimationFrame(tick);
  }
  window.RootedLandscape = {
    update(value, still) {
      target = Math.min(1,Math.max(0,value));
      const changed = paused !== still;
      paused = still;
      if (paused) {
        cancelAnimationFrame(frame); frame = 0; last = 0;
        if (changed) draw();
      } else start();
    }
  };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; last = 0; }
    else start();
  });
  window.addEventListener('resize',size,{passive:true});
  size(); start();
})();
