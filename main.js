// Twisted Gypsy — subtle animated starfield
(function () {
  const c = document.createElement('canvas');
  c.className = 'tg-stars';
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  let w, h, dpr, stars = [];
  const COUNT = 90;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = c.width = innerWidth * dpr;
    h = c.height = innerHeight * dpr;
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
  }

  function init() {
    stars = [];
    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.5 + 0.4) * dpr,
        a: Math.random() * 0.5 + 0.1,  // base alpha
        t: Math.random() * Math.PI * 2,
        v: Math.random() * 0.001 + 0.0003 // twinkle speed
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.t += s.v;
      const pulse = (Math.sin(s.t) + 1) / 2; // 0..1
      const alpha = s.a * (0.35 + 0.65 * pulse);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * (0.7 + 0.3 * pulse), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${alpha})`; // gold
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize(); init(); tick();
})();
