/* ===========================================
   TEAM SECTION - JavaScript
   Style Truus - Image Cycle Animation
   =========================================== */

(function() {
  'use strict';

  // Configuration
  const CYCLE_INTERVAL = 3000; // 3 seconds between image changes
  const STAGGER_DELAY = 500;   // 500ms delay between each card's cycle

  // Get all image cycle containers
  const imageCycleContainers = document.querySelectorAll('[data-image-cycle]');

  if (imageCycleContainers.length === 0) {
    console.log('Team section: No image cycle containers found');
    return;
  }

  // Initialize each image cycle
  imageCycleContainers.forEach((container, containerIndex) => {
    const items = container.querySelectorAll('[data-image-cycle-item]');

    if (items.length <= 1) return; // No need to cycle if only one image

    let currentIndex = 0;

    // Find the initially active item
    items.forEach((item, index) => {
      if (item.dataset.imageCycleItem === 'active') {
        currentIndex = index;
      }
    });

    // Start the cycle with staggered delay
    setTimeout(() => {
      setInterval(() => {
        // Set current as previous
        items[currentIndex].dataset.imageCycleItem = 'previous';

        // Move to next
        currentIndex = (currentIndex + 1) % items.length;

        // Set new active
        items[currentIndex].dataset.imageCycleItem = 'active';

        // Reset previous to not-active after transition
        setTimeout(() => {
          items.forEach((item, index) => {
            if (index !== currentIndex && item.dataset.imageCycleItem === 'previous') {
              item.dataset.imageCycleItem = 'not-active';
            }
          });
        }, 1000); // Wait for fade transition to complete

      }, CYCLE_INTERVAL);
    }, containerIndex * STAGGER_DELAY);
  });

  console.log('Team section initialized with', imageCycleContainers.length, 'image cycles');

})();
