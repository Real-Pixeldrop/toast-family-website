/* ===========================================
   LA TOAST FAMILY - Hero Section
   =========================================== */

// ===========================================
// Elements
// ===========================================
const heroVideo = document.getElementById('heroVideo');
const soundToggle = document.getElementById('soundToggle');
const playPauseBtn = document.getElementById('playPauseBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const heroInner = document.querySelector('.hero-inner');

// ===========================================
// Sound Toggle - Follow Cursor (Smooth Follow)
// ===========================================
let hideTimeout;
let isOverVideo = false;

// Variables pour smooth follow
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let animationFrameId = null;
const easing = 0.08; // Plus c'est petit, plus c'est lent (réduit pour plus d'élasticité)

function showSoundToggle() {
  soundToggle.classList.add('is-visible');
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    soundToggle.classList.remove('is-visible');
  }, 2000);
}

function animateSoundToggle() {
  // Interpolation vers la position cible
  currentX += (targetX - currentX) * easing;
  currentY += (targetY - currentY) * easing;

  // Appliquer la position
  soundToggle.style.left = currentX + 'px';
  soundToggle.style.top = currentY + 'px';

  // Continuer l'animation si le bouton est visible
  if (soundToggle.classList.contains('is-visible')) {
    animationFrameId = requestAnimationFrame(animateSoundToggle);
  }
}

function updateSoundTogglePosition(e) {
  // Mettre à jour la cible (en haut à droite du curseur)
  targetX = e.clientX + 60;
  targetY = e.clientY - 40;

  // Lancer l'animation si pas déjà active
  if (!animationFrameId) {
    currentX = targetX; // Init position au premier mouvement
    currentY = targetY;
    animationFrameId = requestAnimationFrame(animateSoundToggle);
  }
}

heroInner.addEventListener('mouseenter', () => {
  isOverVideo = true;
});

heroInner.addEventListener('mouseleave', () => {
  isOverVideo = false;
  soundToggle.classList.remove('is-visible');
  clearTimeout(hideTimeout);
});

heroInner.addEventListener('mousemove', (e) => {
  // Don't show sound toggle when over nav or controls
  if (e.target.closest('.hero-nav') || e.target.closest('.video-controls')) {
    soundToggle.classList.remove('is-visible');
    return;
  }

  updateSoundTogglePosition(e);
  showSoundToggle();
});

// ===========================================
// Sound Toggle - Click
// ===========================================
soundToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  heroVideo.muted = !heroVideo.muted;
  soundToggle.classList.toggle('is-unmuted', !heroVideo.muted);
  showSoundToggle();
});

// Also toggle sound when clicking on video
heroInner.addEventListener('click', (e) => {
  if (e.target.closest('.hero-nav') || 
      e.target.closest('.video-controls') || 
      e.target.closest('.sound-toggle')) {
    return;
  }
  heroVideo.muted = !heroVideo.muted;
  soundToggle.classList.toggle('is-unmuted', !heroVideo.muted);
  showSoundToggle();
});

// ===========================================
// Play/Pause
// ===========================================
playPauseBtn.addEventListener('click', () => {
  if (heroVideo.paused) {
    heroVideo.play();
    playPauseBtn.classList.remove('is-paused');
  } else {
    heroVideo.pause();
    playPauseBtn.classList.add('is-paused');
  }
});

// ===========================================
// Fullscreen
// ===========================================
fullscreenBtn.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    heroInner.requestFullscreen();
  }
});

// ===========================================
// Ensure video plays on load
// ===========================================
heroVideo.play().catch(() => {
  // Autoplay blocked, show play button state
  playPauseBtn.classList.add('is-paused');
});
