// Twisted Gypsy starfield — high-contrast twinkle + gentle drift
(function () {
  const canvas = document.querySelector('.tg-stars');
  const ctx = canvas.getContext('2d');

  let w, h, dpr, stars = [];
  const GOLD_N = 140, WHITE_N = 100;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = canvas.width  = innerWidth  * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width  = innerWidth  + 'px';
    canvas.style.height = innerHeight + 'px';
  }

  function mk(color) {
    const base = color === 'gold';
    const r = (Math.random() * (base ? 2.6 : 1.9) + (base ? 1.0 : 0.7)) * dpr;
    return {
      x: Math.random()*w, y: Math.random()*h, r,
      a: Math.random()*(base?0.7:0.6) + (base?0.6:0.5),
      t: Math.random()*Math.PI*2,
      v: Math.random()*0.003  + (base?0.0015:0.001),   // faster pulse
      dx:(Math.random()-0.5)*(base?0.22:0.18),
      dy:(Math.random()-0.5)*(base?0.16:0.12),
      flick: Math.random()*0.35 + 0.65,               // random flicker factor
      color
    };
  }

  function init() {
    stars = [];
    for (let i=0;i<GOLD_N;i++) stars.push(mk('gold'));
    for (let i=0;i<WHITE_N;i++) stars.push(mk('white'));
  }

  function draw(s, pulse) {
    const radius = s.r * (0.55 + 0.45*pulse * s.flick);
    const alpha  = s.a * (0.45 + 0.55*pulse);
    const col = s.color==='gold' ? '212,175,55' : '255,255,255';
    const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius);
    g.addColorStop(0, `rgba(${col},${alpha})`);
    g.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(s.x, s.y, radius, 0, Math.PI*2); ctx.fill();
  }

  function tick() {
    ctx.clearRect(0,0,w,h);
    for (const s of stars) {
      s.t += s.v;
      const pulse = (Math.sin(s.t)+1)/2;
      draw(s, pulse);
      s.x += s.dx; s.y += s.dy;
      if (s.x < -12) s.x = w+12; if (s.x > w+12) s.x = -12;
      if (s.y < -12) s.y = h+12; if (s.y > h+12) s.y = -12;
    }
    requestAnimationFrame(tick);
  }

  addEventListener('resize', ()=>{resize();init();});
  resize(); init(); tick();
})();
