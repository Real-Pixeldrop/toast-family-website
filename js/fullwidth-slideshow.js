/* ===========================================
   FULLWIDTH SLIDESHOW - Rotation d'images avec Ken Burns
   =========================================== */

(function() {
  'use strict';

  const INTERVAL = 5000; // 5 secondes entre chaque image

  function init() {
    const section = document.querySelector('[data-fullwidth-slideshow]');
    if (!section) return;

    const images = section.querySelectorAll('.fullwidth-image__img');
    if (images.length <= 1) return;

    let currentIndex = 0;

    setInterval(() => {
      // Remove active from current
      images[currentIndex].classList.remove('is-active');

      // Move to next
      currentIndex = (currentIndex + 1) % images.length;

      // Add active to new
      images[currentIndex].classList.add('is-active');
    }, INTERVAL);

    console.log('Fullwidth slideshow initialized with', images.length, 'images');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
