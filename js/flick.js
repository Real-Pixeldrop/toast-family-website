/* ===========================================
   FLICK SECTION - JavaScript
   Carousel de cartes draggable (version vanilla JS)
   =========================================== */

(function() {
  'use strict';

  const init = document.querySelector('[data-flick-cards-init]');
  if (!init) return;

  const list = init.querySelector('[data-flick-cards-list]');
  const dragger = init.querySelector('[data-flick-cards-dragger]');
  const cards = Array.from(list.querySelectorAll('[data-flick-cards-item]'));
  const total = cards.length;

  if (total < 5) {
    console.log('Flick: Need at least 5 cards');
    return;
  }

  let activeIdx = 0;
  const swipeThreshold = 0.1;
  const mod = (n, m) => ((n % m) + m) % m;

  // Animation config for each position
  function getCfg(i, ci) {
    let diff = i - ci;
    if (diff > total / 2) diff -= total;
    else if (diff < -total / 2) diff += total;

    switch (diff) {
      case 0: return { x: 0, y: 0, rot: 0, s: 1, o: 1, z: 5 };
      case 1: return { x: 25, y: 1, rot: 10, s: 0.9, o: 1, z: 4 };
      case -1: return { x: -25, y: 1, rot: -10, s: 0.9, o: 1, z: 4 };
      case 2: return { x: 45, y: 5, rot: 15, s: 0.8, o: 1, z: 3 };
      case -2: return { x: -45, y: 5, rot: -15, s: 0.8, o: 1, z: 3 };
      default:
        const dir = diff > 0 ? 1 : -1;
        return { x: 55 * dir, y: 5, rot: 20 * dir, s: 0.6, o: 0, z: 2 };
    }
  }

  // Get status based on position
  function getStatus(cfg) {
    if (cfg.x === 0) return 'active';
    if (cfg.x === 25) return '2-after';
    if (cfg.x === -25) return '2-before';
    if (cfg.x === 45) return '3-after';
    if (cfg.x === -45) return '3-before';
    return 'hidden';
  }

  // Animate a card to target config
  function animateCard(card, cfg, duration = 600) {
    const status = getStatus(cfg);
    card.setAttribute('data-flick-cards-item-status', status);
    card.style.zIndex = cfg.z;

    // Use CSS transitions for smooth animation
    card.style.transition = `transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${duration}ms ease`;
    card.style.transform = `translate(${cfg.x}%, ${cfg.y}%) rotate(${cfg.rot}deg) scale(${cfg.s})`;
    card.style.opacity = cfg.o;
  }

  // Set card position immediately (no animation)
  function setCardImmediate(card, cfg) {
    const status = getStatus(cfg);
    card.setAttribute('data-flick-cards-item-status', status);
    card.style.zIndex = cfg.z;
    card.style.transition = 'none';
    card.style.transform = `translate(${cfg.x}%, ${cfg.y}%) rotate(${cfg.rot}deg) scale(${cfg.s})`;
    card.style.opacity = cfg.o;
  }

  // Render all cards at current active index
  function renderDiscrete(ci, animate = true) {
    cards.forEach((card, i) => {
      const cfg = getCfg(i, ci);
      if (animate) {
        animateCard(card, cfg);
      } else {
        setCardImmediate(card, cfg);
      }
    });
  }

  // Initial render
  renderDiscrete(activeIdx, false);

  // Drag handling
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let containerWidth = init.clientWidth;

  function onDragStart(e) {
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentX = 0;
    containerWidth = init.clientWidth;
    init.setAttribute('data-flick-drag-status', 'grabbing');

    // Remove transitions during drag
    cards.forEach(card => {
      card.style.transition = 'none';
    });
  }

  function onDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentX = clientX - startX;
    const raw = currentX / containerWidth;
    const prog = Math.min(1, Math.abs(raw));
    const dir = raw > 0 ? -1 : 1;
    const nextCi = mod(activeIdx + dir, total);

    // Interpolate between current and next state
    cards.forEach((card, i) => {
      const a = getCfg(i, activeIdx);
      const b = getCfg(i, nextCi);
      const mix = (prop) => a[prop] + (b[prop] - a[prop]) * prog;

      card.style.transform = `translate(${mix('x')}%, ${mix('y')}%) rotate(${mix('rot')}deg) scale(${mix('s')})`;
      card.style.opacity = mix('o');
    });
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;

    const raw = currentX / containerWidth;
    let shift = 0;
    if (raw > swipeThreshold) shift = -1;
    else if (raw < -swipeThreshold) shift = 1;

    activeIdx = mod(activeIdx + shift, total);
    renderDiscrete(activeIdx, true);
    init.setAttribute('data-flick-drag-status', 'grab');
  }

  // Mouse events
  dragger.addEventListener('mousedown', onDragStart);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);

  // Touch events
  dragger.addEventListener('touchstart', onDragStart, { passive: true });
  document.addEventListener('touchmove', onDragMove, { passive: false });
  document.addEventListener('touchend', onDragEnd);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      activeIdx = mod(activeIdx - 1, total);
      renderDiscrete(activeIdx, true);
    } else if (e.key === 'ArrowRight') {
      activeIdx = mod(activeIdx + 1, total);
      renderDiscrete(activeIdx, true);
    }
  });

  // Resize handling
  window.addEventListener('resize', () => {
    containerWidth = init.clientWidth;
  });

  console.log('Flick carousel initialized with', total, 'cards');

})();
