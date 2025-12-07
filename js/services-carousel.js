/* ===========================================
   LA TOAST FAMILY - Services Carousel
   =========================================== */

// ===========================================
// Elements - Dark Carousel
// ===========================================
const servicesTrack = document.getElementById('servicesCarouselTrack');
const servicesPrevBtn = document.getElementById('servicesPrev');
const servicesNextBtn = document.getElementById('servicesNext');
const serviceCards = document.querySelectorAll('.service-card-dark');

// Elements - Light Carousel
const servicesLightTrack = document.getElementById('servicesCarouselLightTrack');
const servicesLightPrevBtn = document.getElementById('servicesLightPrev');
const servicesLightNextBtn = document.getElementById('servicesLightNext');
const serviceCardsLight = document.querySelectorAll('.service-card-light');

// ===========================================
// State
// ===========================================
let currentIndex = 0;
let currentLightIndex = 0;
const cardWidth = 450; // Width of card
const gap = 30; // Gap between cards
const moveDistance = cardWidth + gap;

// ===========================================
// Navigation Functions
// ===========================================
function updateCarousel() {
  const translateX = -(currentIndex * moveDistance);
  servicesTrack.style.transform = `translateX(${translateX}px)`;
}

function goToNext() {
  const cards = servicesTrack.querySelectorAll('.service-card-dark');
  const maxIndex = Math.floor(cards.length / 2); // Only count unique cards (not duplicates)

  if (currentIndex < maxIndex - 1) {
    currentIndex++;
  } else {
    // Loop back to start
    currentIndex = 0;
  }

  updateCarousel();
}

function goToPrev() {
  const cards = servicesTrack.querySelectorAll('.service-card-dark');
  const maxIndex = Math.floor(cards.length / 2);

  if (currentIndex > 0) {
    currentIndex--;
  } else {
    // Loop to end
    currentIndex = maxIndex - 1;
  }

  updateCarousel();
}

// ===========================================
// Event Listeners
// ===========================================
servicesNextBtn.addEventListener('click', goToNext);
servicesPrevBtn.addEventListener('click', goToPrev);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // Only if user is viewing services section
  const servicesSection = document.querySelector('.services-carousel-section');
  const rect = servicesSection.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

  if (!isInView) return;

  if (e.key === 'ArrowLeft') {
    goToPrev();
  } else if (e.key === 'ArrowRight') {
    goToNext();
  }
});

// ===========================================
// Default Active State (First Card)
// ===========================================
// Set first card as active by default
if (serviceCards.length > 0) {
  serviceCards[0].classList.add('is-active');
}

// Remove active class when hovering any card
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    serviceCards.forEach(c => c.classList.remove('is-active'));
  });
});

// Re-add active class to first card when mouse leaves all cards
const servicesWrapper = document.querySelector('.services-carousel-wrapper');
if (servicesWrapper) {
  servicesWrapper.addEventListener('mouseleave', () => {
    serviceCards.forEach(c => c.classList.remove('is-active'));
    if (serviceCards.length > 0) {
      serviceCards[0].classList.add('is-active');
    }
  });
}

// ===========================================
// Light Carousel Navigation
// ===========================================
function updateLightCarousel() {
  const translateX = -(currentLightIndex * moveDistance);
  servicesLightTrack.style.transform = `translateX(${translateX}px)`;
}

function goToLightNext() {
  const cards = servicesLightTrack.querySelectorAll('.service-card-light');
  const maxIndex = Math.floor(cards.length / 2);

  if (currentLightIndex < maxIndex - 1) {
    currentLightIndex++;
  } else {
    currentLightIndex = 0;
  }

  updateLightCarousel();
}

function goToLightPrev() {
  const cards = servicesLightTrack.querySelectorAll('.service-card-light');
  const maxIndex = Math.floor(cards.length / 2);

  if (currentLightIndex > 0) {
    currentLightIndex--;
  } else {
    currentLightIndex = maxIndex - 1;
  }

  updateLightCarousel();
}

// Event Listeners - Light Carousel
servicesLightNextBtn.addEventListener('click', goToLightNext);
servicesLightPrevBtn.addEventListener('click', goToLightPrev);

// Default Active State - Light Carousel
if (serviceCardsLight.length > 0) {
  serviceCardsLight[0].classList.add('is-active');
}

serviceCardsLight.forEach(card => {
  card.addEventListener('mouseenter', () => {
    serviceCardsLight.forEach(c => c.classList.remove('is-active'));
  });
});

const servicesLightWrapper = document.querySelector('.services-carousel-light-wrapper');
if (servicesLightWrapper) {
  servicesLightWrapper.addEventListener('mouseleave', () => {
    serviceCardsLight.forEach(c => c.classList.remove('is-active'));
    if (serviceCardsLight.length > 0) {
      serviceCardsLight[0].classList.add('is-active');
    }
  });
}

// Optional: Auto-play (commented out by default)
/*
let autoplayInterval;

function startAutoplay() {
  autoplayInterval = setInterval(goToNext, 4000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Start autoplay on load
startAutoplay();

// Pause on hover
const servicesSection = document.querySelector('.services-carousel-section');
servicesSection.addEventListener('mouseenter', stopAutoplay);
servicesSection.addEventListener('mouseleave', startAutoplay);
*/
