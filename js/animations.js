/* ===========================================
   MICRO-ANIMATIONS - Toast Family
   Ripple, Magnetic, Line Draw, Text Reveal
   =========================================== */

(function() {
  'use strict';

  /* ===========================================
     1. RIPPLE EFFECT - Ondulation au clic
     =========================================== */

  function initRippleEffect() {
    const rippleElements = document.querySelectorAll('[data-ripple], .nav-cta, .services-view-all, .services-nav-btn, .control-btn, .footer-cta-email');

    rippleElements.forEach(element => {
      // Ensure position relative for ripple positioning
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.position === 'static') {
        element.style.position = 'relative';
      }
      element.style.overflow = 'hidden';

      element.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        // Get click position relative to element
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set ripple size based on element size
        const size = Math.max(rect.width, rect.height) * 2;

        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (x - size / 2) + 'px';
        ripple.style.top = (y - size / 2) + 'px';

        // Add ripple to element
        element.appendChild(ripple);

        // Remove ripple after animation
        ripple.addEventListener('animationend', () => {
          ripple.remove();
        });
      });
    });

    console.log('Ripple effect initialized on', rippleElements.length, 'elements');
  }

  /* ===========================================
     2. MAGNETIC BUTTONS - Attraction curseur
     =========================================== */

  function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('[data-magnetic], .nav-cta, .services-view-all, .footer-cta-email, .link-cta');

    magneticElements.forEach(element => {
      const strength = parseFloat(element.dataset.magneticStrength) || 0.3;
      const distance = parseFloat(element.dataset.magneticDistance) || 100;

      let isHovered = false;
      let animationFrame = null;
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;

      function animate() {
        // Smooth easing
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;

        element.style.transform = `translate(${currentX}px, ${currentY}px)`;

        if (isHovered || Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          element.style.transform = '';
        }
      }

      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Calculate distance from center
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (dist < distance) {
          targetX = deltaX * strength;
          targetY = deltaY * strength;

          if (!animationFrame) {
            animationFrame = requestAnimationFrame(animate);
          }
        }
      });

      element.addEventListener('mouseenter', () => {
        isHovered = true;
        if (!animationFrame) {
          animationFrame = requestAnimationFrame(animate);
        }
      });

      element.addEventListener('mouseleave', () => {
        isHovered = false;
        targetX = 0;
        targetY = 0;
      });
    });

    console.log('Magnetic buttons initialized on', magneticElements.length, 'elements');
  }

  /* ===========================================
     3. SVG LINE DRAW - Lignes qui se dessinent
     =========================================== */

  function initLineDrawAnimations() {
    const lineElements = document.querySelectorAll('[data-line-draw], .services-truus__line-svg path, .clients-truus__line-svg path, .clients-truus__arrow-svg path, .services-truus-card__line-svg path, .flick-group__blob-scribble-svg path');

    lineElements.forEach(path => {
      // Get path length
      const pathLength = path.getTotalLength();

      // Set initial state
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;
      path.style.transition = 'stroke-dashoffset 0.8s ease-out';

      // Find parent element for intersection observer
      const parent = path.closest('section') || path.closest('.services-truus-card') || path.parentElement;

      // Create observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Small delay for stagger effect
            const delay = path.dataset.lineDelay || 0;
            setTimeout(() => {
              path.style.strokeDashoffset = '0';
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      });

      observer.observe(parent);
    });

    console.log('Line draw initialized on', lineElements.length, 'paths');
  }

  /* ===========================================
     4. TEXT REVEAL - Mots qui apparaissent
     =========================================== */

  function initTextReveal() {
    const textElements = document.querySelectorAll('[data-text-reveal]');

    textElements.forEach(element => {
      const text = element.innerHTML;
      const delay = parseInt(element.dataset.textRevealDelay) || 80;

      // Split into words while preserving HTML tags
      const words = text.split(/(\s+)/).filter(word => word.trim() !== '');

      // Wrap each word
      let wordIndex = 0;
      const wrappedContent = words.map(word => {
        // Skip if it's just whitespace
        if (/^\s+$/.test(word)) {
          return word;
        }

        // Check if word contains HTML tag
        if (word.includes('<')) {
          // Handle HTML tags - wrap content inside
          return word.replace(/(<[^>]+>)([^<]*)(<\/[^>]+>)/g, (match, openTag, content, closeTag) => {
            if (content.trim()) {
              const wrapped = `${openTag}<span class="word-reveal" style="transition-delay: ${wordIndex * delay}ms">${content}</span>${closeTag}`;
              wordIndex++;
              return wrapped;
            }
            return match;
          });
        }

        const wrapped = `<span class="word-reveal" style="transition-delay: ${wordIndex * delay}ms">${word}</span>`;
        wordIndex++;
        return wrapped;
      }).join(' ');

      element.innerHTML = wrappedContent;

      // Create observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const words = element.querySelectorAll('.word-reveal');
            words.forEach(word => {
              word.classList.add('is-visible');
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      });

      observer.observe(element);
    });

    console.log('Text reveal initialized on', textElements.length, 'elements');
  }

  /* ===========================================
     INIT ALL ANIMATIONS
     =========================================== */

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initRippleEffect();
    initMagneticButtons();
    initLineDrawAnimations();
    initTextReveal();
    console.log('All micro-animations initialized');
  }

})();
