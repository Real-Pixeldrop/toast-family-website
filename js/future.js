/* ===========================================
   FUTURE SECTION - JavaScript
   Momentum-based Cards Hover Animation
   =========================================== */

(function() {
  'use strict';

  // Configuration
  const xyMultiplier = 25;
  const rotationMultiplier = 15;
  const friction = 0.92;
  const returnSpeed = 0.08;

  // Check if device supports hover
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  // Track mouse velocity
  let prevX = 0, prevY = 0;
  let velX = 0, velY = 0;

  // Store animation states for each element
  const elementStates = new Map();

  // Update velocity on mouse move
  document.addEventListener('mousemove', (e) => {
    velX = e.clientX - prevX;
    velY = e.clientY - prevY;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  // Get all future cards and flying tags
  const futureSection = document.querySelector('.future');
  if (!futureSection) return;

  const inertiaElements = futureSection.querySelectorAll('.future__cards-item, .future__flying-tag');

  inertiaElements.forEach(el => {
    // Initialize state
    elementStates.set(el, {
      x: 0,
      y: 0,
      rotation: 0,
      vx: 0,
      vy: 0,
      vr: 0,
      isHovered: false
    });

    el.addEventListener('mouseenter', (e) => {
      const state = elementStates.get(el);
      const rect = el.getBoundingClientRect();

      // Calculate offset from center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      // Calculate torque for rotation
      const rawTorque = offsetX * velY - offsetY * velX;
      const leverDist = Math.hypot(offsetX, offsetY) || 1;
      const angularForce = rawTorque / leverDist;

      // Set velocities
      state.vx = clamp(velX * xyMultiplier, -300, 300);
      state.vy = clamp(velY * xyMultiplier, -300, 300);
      state.vr = clamp(angularForce * rotationMultiplier, -30, 30);
      state.isHovered = true;
    });

    el.addEventListener('mouseleave', () => {
      const state = elementStates.get(el);
      state.isHovered = false;
    });
  });

  // Animation loop
  function animate() {
    elementStates.forEach((state, el) => {
      // Apply velocity with friction
      state.x += state.vx * 0.016; // Multiply by ~frame time
      state.y += state.vy * 0.016;
      state.rotation += state.vr * 0.016;

      // Apply friction
      state.vx *= friction;
      state.vy *= friction;
      state.vr *= friction;

      // Return to origin when not hovered
      if (!state.isHovered) {
        state.x += (0 - state.x) * returnSpeed;
        state.y += (0 - state.y) * returnSpeed;
        state.rotation += (0 - state.rotation) * returnSpeed;
      }

      // Clamp values
      state.x = clamp(state.x, -50, 50);
      state.y = clamp(state.y, -50, 50);
      state.rotation = clamp(state.rotation, -15, 15);

      // Apply transform
      el.style.transform = getBaseTransform(el) + ` translate(${state.x}px, ${state.y}px) rotate(${state.rotation}deg)`;
    });

    requestAnimationFrame(animate);
  }

  // Get base transform (the original rotation from CSS)
  function getBaseTransform(el) {
    if (el.classList.contains('future__cards-item')) {
      if (el.classList.contains('is--2')) {
        return 'translateY(1.75em) rotate(3.5deg)';
      } else if (el.classList.contains('is--3')) {
        return 'translateY(-1.75em) rotate(-5deg)';
      } else if (el.classList.contains('is--4')) {
        return 'translateY(0) rotate(3.5deg)';
      } else {
        return 'translateY(-1.75em) rotate(-7.5deg)';
      }
    }
    return '';
  }

  // Clamp helper
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // Start animation
  animate();

  // Line draw animation on scroll - dynamic
  const titleLine = document.querySelector('.future__title-line');
  const linePath = titleLine ? titleLine.querySelector('svg path') : null;

  if (titleLine && linePath) {
    const pathLength = linePath.getTotalLength();

    // Set initial state
    linePath.style.strokeDasharray = pathLength;
    linePath.style.strokeDashoffset = pathLength;

    function updateLineProgress() {
      const rect = titleLine.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when element enters bottom, 1 when it reaches center
      const elementCenter = rect.top + rect.height / 2;
      const progress = 1 - (elementCenter / (windowHeight * 0.7));

      // Clamp between 0 and 1
      const clampedProgress = Math.min(Math.max(progress, 0), 1);

      // Update stroke-dashoffset
      const offset = pathLength * (1 - clampedProgress);
      linePath.style.strokeDashoffset = offset;
    }

    window.addEventListener('scroll', updateLineProgress);
    updateLineProgress(); // Initial call
  }

  console.log('Future section animations initialized');

})();
