/* ===========================================
   TEAM SECTION - Image Rotation avec Fondu
   =========================================== */

(function() {
  'use strict';

  // Configuration
  const CYCLE_INTERVAL = 3000; // 3 secondes

  /**
   * Initialize team image rotation
   */
  function initTeamImageRotation() {
    const cycleElements = document.querySelectorAll('[data-image-cycle]');

    cycleElements.forEach((element, index) => {
      const images = element.querySelectorAll('.cover-image');

      if (images.length <= 1) return;

      let currentIndex = 0;

      // Démarrage avec un délai différent pour chaque groupe
      setTimeout(() => {
        setInterval(() => {
          // Retirer la classe active de l'image actuelle
          images[currentIndex].classList.remove('active');

          // Passer à l'image suivante
          currentIndex = (currentIndex + 1) % images.length;

          // Ajouter la classe active à la nouvelle image
          images[currentIndex].classList.add('active');
        }, CYCLE_INTERVAL);
      }, index * 500); // Décalage de 500ms entre les groupes
    });
  }

  /**
   * Initialize on DOM ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeamImageRotation);
  } else {
    initTeamImageRotation();
  }

})();
