// Twisted Gypsy starfield — v13
(function () {
  const c = document.getElementById('tg-stars');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, dpr, stars = [];
  const GOLD_N = 140, WHITE_N = 100;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = c.width = innerWidth * dpr;
    h = c.height = innerHeight * dpr;
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
  }

  function make(color) {
    const isGold = color === 'gold';
    const r = (Math.random() * (isGold ? 2.6 : 1.9) + (isGold ? 1.0 : 0.7)) * dpr;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r,
      a: Math.random() * (isGold ? 0.7 : 0.6) + (isGold ? 0.6 : 0.5),
      t: Math.random() * Math.PI * 2,
      v: Math.random() * (isGold ? 0.003 : 0.0012) + (isGold ? 0.0015 : 0.001),
      dx: (Math.random() - 0.5) * (isGold ? 0.22 : 0.18),
      dy: (Math.random() - 0.5) * (isGold ? 0.16 : 0.12),
      flick: Math.random() * 0.35 + 0.65,
      color
    };
  }

  function init() {
    stars = [];
    for (let i = 0; i < GOLD_N; i++) stars.push(make('gold'));
    for (let i = 0; i < WHITE_N; i++) stars.push(make('white'));
  }

  function draw(s, p) {
    const r = s.r * (0.55 + 0.45 * p * s.flick);
    const a = s.a * (0.45 + 0.55 * p);
    const col = s.color === 'gold' ? '212,175,55' : '255,255,255';
    const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
    g.addColorStop(0, `rgba(${col},${a})`);
    g.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.t += s.v;
      const p = (Math.sin(s.t) + 1) / 2;
      draw(s, p);
      s.x += s.dx; s.y += s.dy;
      if (s.x < -12) s.x = w + 12;
      if (s.x > w + 12) s.x = -12;
      if (s.y < -12) s.y = h + 12;
      if (s.y > h + 12) s.y = -12;
    }
    requestAnimationFrame(tick);
  }

  addEventListener('resize', () => { resize(); init(); });
  resize(); init(); tick();
})();
