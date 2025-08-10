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
    const r = (Math.random() * (base ? 2.
