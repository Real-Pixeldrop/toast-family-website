/**
 * Testimonials Cards Animation - Style Truus
 * Effet hover élastique avec GSAP-like animation
 */

(function() {
  'use strict';

  const cards = document.querySelectorAll('.testimonial-truus-card__wrap');
  if (cards.length === 0) return;

  const container = document.querySelector('.testimonials-truus__row-cards');
  const cardContents = document.querySelectorAll('.testimonial-truus-card');
  const cardsLength = cards.length;

  let currentPortion = 0;
  let containerW = container ? container.offsetWidth : 0;

  // Elastic easing function
  function elasticOut(t) {
    const p = 0.3;
    return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
  }

  // Animate element with elastic effect
  function animateElement(el, props, duration = 800) {
    const start = performance.now();
    const initialValues = {};

    // Get initial values
    const computedStyle = window.getComputedStyle(el);
    const currentTransform = computedStyle.transform;

    // Parse current transform or use defaults
    initialValues.xPercent = parseFloat(el.dataset.currentX) || 0;
    initialValues.yPercent = parseFloat(el.dataset.currentY) || 0;
    initialValues.rotation = parseFloat(el.dataset.currentRot) || 0;
    initialValues.scale = parseFloat(el.dataset.currentScale) || 1;

    function animate(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = elasticOut(progress);

      const x = initialValues.xPercent + (props.xPercent - initialValues.xPercent) * eased;
      const y = initialValues.yPercent + (props.yPercent - initialValues.yPercent) * eased;
      const rot = initialValues.rotation + (props.rotation - initialValues.rotation) * eased;
      const scale = initialValues.scale + (props.scale - initialValues.scale) * eased;

      el.style.transform = `translate(${x}%, ${y}%) rotate(${rot}deg) scale(${scale})`;

      // Store current values
      el.dataset.currentX = x;
      el.dataset.currentY = y;
      el.dataset.currentRot = rot;
      el.dataset.currentScale = scale;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  // Get offset from data attributes
  function getOffset(el) {
    return {
      x: parseFloat(el.dataset.offsetX) || 0,
      y: parseFloat(el.dataset.offsetY) || 0,
      rot: parseFloat(el.dataset.offsetRot) || 0
    };
  }

  // Set initial transforms
  cards.forEach(card => {
    const offset = getOffset(card);
    card.style.transform = `translate(${offset.x}%, ${offset.y}%) rotate(${offset.rot}deg) scale(1)`;
    card.dataset.currentX = offset.x;
    card.dataset.currentY = offset.y;
    card.dataset.currentRot = offset.rot;
    card.dataset.currentScale = 1;
  });

  // Reset portion
  function resetPortion(index) {
    if (index < 0 || index >= cardsLength) return;

    const card = cards[index];
    const offset = getOffset(card);

    animateElement(card, {
      xPercent: offset.x,
      yPercent: offset.y,
      rotation: offset.rot,
      scale: 1
    });

    card.style.zIndex = 5 - index;
  }

  // New active portion
  function newPortion(i) {
    if (i < 0 || i >= cardsLength) return;

    // Animate active card
    animateElement(cards[i], {
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      scale: 1.1
    });

    // Bring to front
    cards[i].style.zIndex = 10;

    // Animate other cards
    cardContents.forEach((content, index) => {
      const wrapper = cards[index];
      if (index !== i) {
        const offset = getOffset(wrapper);
        const xShift = 70 / (index - i);

        animateElement(wrapper, {
          xPercent: offset.x + xShift,
          yPercent: offset.y,
          rotation: offset.rot,
          scale: 1
        });

        wrapper.style.zIndex = 5 - Math.abs(index - i);
      }
    });
  }

  // Update container width on resize
  window.addEventListener('resize', () => {
    containerW = container ? container.offsetWidth : 0;
  });

  // Mouse move handler
  if (container) {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const percentage = mouseX / containerW;
      const activePortion = Math.ceil(percentage * cardsLength);

      if (
        currentPortion !== activePortion &&
        activePortion > 0 &&
        activePortion <= cardsLength
      ) {
        if (currentPortion !== 0) resetPortion(currentPortion - 1);
        currentPortion = activePortion;
        newPortion(currentPortion - 1);
      }
    });

    container.addEventListener('mouseleave', () => {
      resetPortion(currentPortion - 1);
      currentPortion = 0;

      // Reset all cards
      cards.forEach((card, index) => {
        const offset = getOffset(card);
        animateElement(card, {
          xPercent: offset.x,
          yPercent: offset.y,
          rotation: offset.rot,
          scale: 1
        });
        card.style.zIndex = 5 - index;
      });
    });
  }

  console.log('Testimonials cards animation initialized');
})();
