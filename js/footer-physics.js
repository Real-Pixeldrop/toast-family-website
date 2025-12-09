/* ===========================================
   FOOTER PHYSICS - Logos draggables avec gravité
   =========================================== */

(function() {
  'use strict';

  const GRAVITY = 0.5;
  const FRICTION = 0.98;
  const BOUNCE = 0.6;
  const THROW_MULTIPLIER = 15;

  let logos = [];
  let floorY = 0;
  let containerRect = null;
  let animationId = null;
  let isAnimating = false;
  let hoverTag = null;
  let mouseX = 0;
  let mouseY = 0;
  let isHoveringLogo = false;

  function init() {
    const container = document.getElementById('footerPhysicsContainer');
    if (!container) return;

    const logoElements = container.querySelectorAll('[data-physics-logo]');
    if (logoElements.length === 0) return;

    // Create hover tag element
    createHoverTag();

    // Get floor position (footer-grid line)
    const footerGrid = document.querySelector('.footer-grid');

    // Setup each logo
    logoElements.forEach((logo, index) => {
      const logoData = {
        element: logo,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        width: 80,
        height: 60,
        isDragging: false,
        lastMouseX: 0,
        lastMouseY: 0,
        rotation: (Math.random() - 0.5) * 30,
        initialDelay: index * 150 // Staggered drop
      };

      logos.push(logoData);

      // Initial position - scattered in footer
      logo.addEventListener('load', () => {
        logoData.width = logo.offsetWidth;
        logoData.height = logo.offsetHeight;
        updateContainerBounds();
        setInitialPosition(logoData, index);
      });

      // If already loaded
      if (logo.complete) {
        logoData.width = logo.offsetWidth || 80;
        logoData.height = logo.offsetHeight || 60;
      }

      // Mouse events
      logo.addEventListener('mousedown', (e) => startDrag(e, logoData));
      logo.addEventListener('touchstart', (e) => startDrag(e, logoData), { passive: false });

      // Hover events for tag and cursor
      logo.addEventListener('mouseenter', () => {
        if (!logoData.isDragging) {
          isHoveringLogo = true;
          showHoverTag();
          // Switch to drag cursor
          if (window.cursorManager) {
            window.cursorManager.switchCursor('drag');
          }
        }
      });

      logo.addEventListener('mouseleave', () => {
        isHoveringLogo = false;
        hideHoverTag();
        // Switch back to default cursor
        if (window.cursorManager && !logoData.isDragging) {
          window.cursorManager.switchCursor('default');
        }
      });
    });

    // Global mouse/touch events
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateHoverTagPosition();
      onDrag(e);
    });
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // Update bounds on resize
    window.addEventListener('resize', () => {
      updateContainerBounds();
      logos.forEach((logo, index) => {
        if (!logo.isDragging) {
          constrainToBounds(logo);
        }
      });
    });

    // Initial setup with staggered animation
    setTimeout(() => {
      updateContainerBounds();
      logos.forEach((logo, index) => {
        setTimeout(() => {
          setInitialPosition(logo, index);
        }, logo.initialDelay);
      });
      startAnimation();
    }, 100);

    console.log('Footer physics initialized with', logos.length, 'logos');
  }

  function createHoverTag() {
    hoverTag = document.createElement('div');
    hoverTag.className = 'footer-physics-tag';
    hoverTag.innerHTML = 'lancez-moi !';
    document.body.appendChild(hoverTag);
  }

  function showHoverTag() {
    if (hoverTag) {
      hoverTag.classList.add('is-visible');
    }
  }

  function hideHoverTag() {
    if (hoverTag) {
      hoverTag.classList.remove('is-visible');
    }
  }

  function updateHoverTagPosition() {
    if (hoverTag && isHoveringLogo) {
      hoverTag.style.left = (mouseX + 20) + 'px';
      hoverTag.style.top = (mouseY - 30) + 'px';
    }
  }

  function updateContainerBounds() {
    const container = document.getElementById('footerPhysicsContainer');
    const footerBottom = document.querySelector('.footer-bottom');

    if (container) {
      containerRect = container.getBoundingClientRect();
    }

    if (footerBottom && containerRect) {
      const bottomRect = footerBottom.getBoundingClientRect();
      // Floor is just above the footer-bottom section (relative to container)
      floorY = bottomRect.top - containerRect.top - 10;
    }
  }

  function setInitialPosition(logo, index) {
    if (!containerRect) return;

    // Position logos scattered across the footer with varied heights
    const totalLogos = logos.length;
    const spacing = containerRect.width / (totalLogos + 1);

    // Vary the X position with some randomness
    logo.x = spacing * (index + 1) - logo.width / 2 + (Math.random() - 0.5) * 80;

    // Vary Y position - some start higher, some lower
    const heightVariation = [20, 80, 40, 100, 60, 30, 90, 50];
    logo.y = (heightVariation[index % heightVariation.length] || 50) + Math.random() * 30;

    // Give initial varied velocities - not all straight down
    const angleVariation = (Math.random() - 0.5) * Math.PI * 0.5; // -45° to +45°
    const initialSpeed = 2 + Math.random() * 4;
    logo.vx = Math.sin(angleVariation) * initialSpeed;
    logo.vy = Math.cos(angleVariation) * initialSpeed * 0.5; // Slight downward bias

    // Initial rotation
    logo.rotation = (Math.random() - 0.5) * 40;

    updateLogoPosition(logo);
  }

  function startDrag(e, logo) {
    e.preventDefault();

    const pos = getEventPosition(e);

    logo.isDragging = true;
    logo.lastMouseX = pos.x;
    logo.lastMouseY = pos.y;
    logo.vx = 0;
    logo.vy = 0;

    logo.element.classList.add('is-dragging');
    hideHoverTag();

    // Switch to dragging cursor
    if (window.cursorManager) {
      window.cursorManager.switchCursor('dragging');
    }
  }

  function onDrag(e) {
    const draggingLogo = logos.find(l => l.isDragging);
    if (!draggingLogo) return;

    e.preventDefault();

    const pos = getEventPosition(e);

    // Calculate velocity based on movement
    draggingLogo.vx = (pos.x - draggingLogo.lastMouseX) * 0.5;
    draggingLogo.vy = (pos.y - draggingLogo.lastMouseY) * 0.5;

    // Update position relative to container
    if (containerRect) {
      draggingLogo.x = pos.x - containerRect.left - draggingLogo.width / 2;
      draggingLogo.y = pos.y - containerRect.top - draggingLogo.height / 2;
    }

    draggingLogo.lastMouseX = pos.x;
    draggingLogo.lastMouseY = pos.y;

    updateLogoPosition(draggingLogo);
  }

  function endDrag() {
    const draggingLogo = logos.find(l => l.isDragging);
    if (!draggingLogo) return;

    draggingLogo.isDragging = false;
    draggingLogo.element.classList.remove('is-dragging');

    // Switch back to default cursor
    if (window.cursorManager) {
      window.cursorManager.switchCursor('default');
    }

    // Apply throw velocity
    draggingLogo.vx *= THROW_MULTIPLIER;
    draggingLogo.vy *= THROW_MULTIPLIER;
  }

  function getEventPosition(e) {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function updateLogoPosition(logo) {
    logo.element.style.transform = `translate(${logo.x}px, ${logo.y}px) rotate(${logo.rotation}deg)`;
  }

  function constrainToBounds(logo) {
    if (!containerRect) return;

    const maxX = containerRect.width - logo.width;
    const maxY = floorY - logo.height;

    // Left/Right bounds
    if (logo.x < 0) {
      logo.x = 0;
      logo.vx = -logo.vx * BOUNCE;
      logo.rotation += logo.vx * 0.5;
    } else if (logo.x > maxX) {
      logo.x = maxX;
      logo.vx = -logo.vx * BOUNCE;
      logo.rotation += logo.vx * 0.5;
    }

    // Top bound
    if (logo.y < 0) {
      logo.y = 0;
      logo.vy = -logo.vy * BOUNCE;
    }

    // Floor (bottom) bound
    if (logo.y > maxY) {
      logo.y = maxY;
      logo.vy = -logo.vy * BOUNCE;

      // Add friction when on floor
      logo.vx *= 0.9;

      // Add rotation based on horizontal velocity
      logo.rotation += logo.vx * 0.3;

      // Stop if very slow
      if (Math.abs(logo.vy) < 0.5) {
        logo.vy = 0;
      }
    }
  }

  function animate() {
    logos.forEach(logo => {
      if (logo.isDragging) return;

      // Apply gravity
      logo.vy += GRAVITY;

      // Apply friction
      logo.vx *= FRICTION;
      logo.vy *= FRICTION;

      // Update position
      logo.x += logo.vx;
      logo.y += logo.vy;

      // Slowly normalize rotation
      logo.rotation *= 0.99;

      // Constrain to bounds
      constrainToBounds(logo);

      // Update DOM
      updateLogoPosition(logo);
    });

    animationId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (!isAnimating) {
      isAnimating = true;
      animate();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
