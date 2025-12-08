/* ===========================================
   SERVICES SLIDESHOW - Hover Image Cycling (GIF-like)
   =========================================== */

(function() {
  'use strict';

  const cards = document.querySelectorAll('[data-service-slideshow]');
  if (!cards.length) return;

  const INTERVAL = 200; // Very fast like a GIF - 200ms
  const firstCard = cards[0];
  let isAnyHovered = false;

  cards.forEach((card, cardIndex) => {
    const images = card.querySelectorAll('.slideshow-image');
    if (images.length < 2) return;

    let currentIndex = 0;
    let intervalId = null;

    function showNextImage() {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }

    function startSlideshow() {
      if (intervalId) return;
      showNextImage();
      intervalId = setInterval(showNextImage, INTERVAL);
    }

    function stopSlideshow() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      images.forEach((img, i) => {
        img.classList.toggle('active', i === 0);
      });
      currentIndex = 0;
    }

    card._startSlideshow = startSlideshow;
    card._stopSlideshow = stopSlideshow;

    card.addEventListener('mouseenter', () => {
      isAnyHovered = true;
      // Stop all other cards (including first)
      cards.forEach(c => {
        if (c !== card && c._stopSlideshow) {
          c._stopSlideshow();
        }
      });
      // Start this one
      startSlideshow();
    });

    card.addEventListener('mouseleave', () => {
      isAnyHovered = false;
      stopSlideshow();
      // Restart first card after a tiny delay to check if another card is hovered
      setTimeout(() => {
        if (!isAnyHovered && firstCard._startSlideshow) {
          firstCard._startSlideshow();
        }
      }, 50);
    });

    // Start first card by default
    if (cardIndex === 0) {
      startSlideshow();
    }
  });

  console.log('Services slideshow initialized');
})();
