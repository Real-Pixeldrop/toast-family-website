/* ===========================================
   LA TOAST FAMILY - Testimonials Carousel
   =========================================== */

// ===========================================
// Elements
// ===========================================
const testimonialsTrack = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('testimonialPrev');
const nextBtn = document.getElementById('testimonialNext');
const dotsContainer = document.getElementById('testimonialDots');

// ===========================================
// State
// ===========================================
let currentIndex = 0;
let cardsPerView = 3; // Desktop default
let autoplayInterval = null;
const AUTOPLAY_DELAY = 5000; // 5 seconds

// ===========================================
// Calculate Cards Per View (Responsive)
// ===========================================
function getCardsPerView() {
  const width = window.innerWidth;
  if (width < 768) return 1; // Mobile
  if (width < 1024) return 2; // Tablet
  return 3; // Desktop
}

// ===========================================
// Get Total Testimonials
// ===========================================
function getTotalCards() {
  return testimonialsTrack.querySelectorAll('.testimonial-card').length;
}

// ===========================================
// Update Carousel Position
// ===========================================
function updateCarousel() {
  const cards = testimonialsTrack.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;

  if (totalCards === 0) return;

  // Calculate card width (including gap)
  const cardWidth = cards[0].offsetWidth;
  const gap = 40; // Matches CSS gap
  const moveDistance = (cardWidth + gap) * currentIndex;

  // Apply transform
  testimonialsTrack.style.transform = `translateX(-${moveDistance}px)`;

  // Update button states
  updateButtonStates();

  // Update dots
  updateDots();
}

// ===========================================
// Update Button States (Disable at edges)
// ===========================================
function updateButtonStates() {
  const totalCards = getTotalCards();
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= maxIndex;
}

// ===========================================
// Create Dots Navigation
// ===========================================
function createDots() {
  if (!dotsContainer) return;

  dotsContainer.innerHTML = '';
  const totalCards = getTotalCards();
  const totalDots = Math.max(1, totalCards - cardsPerView + 1);

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('button');
    dot.classList.add('testimonial-dot');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);

    if (i === currentIndex) {
      dot.classList.add('is-active');
    }

    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
      resetAutoplay();
    });

    dotsContainer.appendChild(dot);
  }
}

// ===========================================
// Update Dots Active State
// ===========================================
function updateDots() {
  if (!dotsContainer) return;

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('is-active', index === currentIndex);
  });
}

// ===========================================
// Navigation Functions
// ===========================================
function goToPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
    resetAutoplay();
  }
}

function goToNext() {
  const totalCards = getTotalCards();
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
    resetAutoplay();
  }
}

// ===========================================
// Autoplay Functions
// ===========================================
function startAutoplay() {
  stopAutoplay(); // Clear any existing interval
  autoplayInterval = setInterval(() => {
    const totalCards = getTotalCards();
    const maxIndex = Math.max(0, totalCards - cardsPerView);

    if (currentIndex >= maxIndex) {
      // Loop back to start
      currentIndex = 0;
    } else {
      currentIndex++;
    }

    updateCarousel();
  }, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
}

function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}

// ===========================================
// Touch/Swipe Support (Mobile)
// ===========================================
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  touchEndX = e.touches[0].clientX;
}

function handleTouchEnd() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left (next)
      goToNext();
    } else {
      // Swiped right (prev)
      goToPrev();
    }
  }
}

// ===========================================
// Resize Handler
// ===========================================
function handleResize() {
  const newCardsPerView = getCardsPerView();

  if (newCardsPerView !== cardsPerView) {
    cardsPerView = newCardsPerView;

    // Adjust currentIndex if needed
    const totalCards = getTotalCards();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    currentIndex = Math.min(currentIndex, maxIndex);

    createDots();
    updateCarousel();
  }
}

// Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResize, 150);
});

// ===========================================
// Event Listeners
// ===========================================
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', goToPrev);
  nextBtn.addEventListener('click', goToNext);
}

// Touch events
if (testimonialsTrack) {
  testimonialsTrack.addEventListener('touchstart', handleTouchStart);
  testimonialsTrack.addEventListener('touchmove', handleTouchMove);
  testimonialsTrack.addEventListener('touchend', handleTouchEnd);
}

// Pause autoplay on hover
const testimonialsSection = document.querySelector('.testimonials-section');
if (testimonialsSection) {
  testimonialsSection.addEventListener('mouseenter', stopAutoplay);
  testimonialsSection.addEventListener('mouseleave', startAutoplay);
}

// ===========================================
// Initialization
// ===========================================
function init() {
  cardsPerView = getCardsPerView();
  createDots();
  updateCarousel();
  startAutoplay(); // Enable autoplay
}

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
