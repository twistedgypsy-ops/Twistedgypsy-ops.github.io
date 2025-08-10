// Twisted Gypsy starfield
(function () {
  const canvas = document.querySelector('.tg-stars');
  const ctx = canvas.getContext('2d');

  let w, h, dpr, stars = [];
  const GOLD_N = 160, WHITE_N = 80;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = canvas.width  = innerWidth  * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width  = innerWidth  + 'px';
    canvas.style.height = innerHeight + 'px';
  }

  function makeStar(color) {
    const r = (Math.random() * (color==='gold' ? 2.2 : 1.6) + (color==='gold' ? 0.8 : 0.6)) * dpr;
    return {
      x: Math.random()*w, y: Math.random()*h, r,
      a: Math.random()*(color==='gold'?0.7:0.6) + (color==='gold'?0.5:0.4),
      t: Math.random()*Math.PI*2,
      v: Math.random()*0.002 + (color==='gold'?0.001:0.0008),
      dx: (Math.random()-0.5)*(color==='gold'?0.18:0.15),
      dy: (Math.random()-0.5)*(color==='gold'?0.12:0.10),
      color
    };
  }

  function init() {
    stars = [];
    for (let i=0;i<GOLD_N;i++) stars.push(makeStar('gold'));
    for (let i=0;i<WHITE_N;i++) stars.push(makeStar('white'));
  }

  function draw(s, pulse) {
    const radius = s.r * (0.65 + 0.35*pulse);
    const alpha  = s.a * (0.5  + 0.5 *pulse);
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
      s.t += s.v; const pulse = (Math.sin(s.t)+1)/2;
      draw(s, pulse);
      s.x += s.dx; s.y += s.dy;
      if (s.x < -10) s.x = w+10; if (s.x > w+10) s.x = -10;
      if (s.y < -10) s.y = h+10; if (s.y > h+10) s.y = -10;
    }
    requestAnimationFrame(tick);
  }

  addEventListener('resize', ()=>{resize();init();});
  resize(); init(); tick();
})();
