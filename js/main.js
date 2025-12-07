/* ===========================================
   LA TOAST FAMILY - Card Carousel
   =========================================== */

// ===========================================
// Projects Data
// ===========================================
const projects = [
  {
    id: 1,
    image: 'assets/images/projects/july-thumbnail.jpg',
    video: 'assets/videos/project-july.mp4',
    brand: 'toast family',
    brandColor: '#FF6B35',
    brandTextColor: '#fff',
    title: 'july was hot 🔥',
    subtitle: 'nos réalisations',
    category: 'social media',
    categoryIcon: '📸',
    overlayText: ''
  },
  {
    id: 2,
    image: 'assets/images/projects/oklahoma-thumb.png',
    video: 'assets/videos/project-oklahoma.mp4',
    brand: 'oklahoma',
    brandColor: '#8B4513',
    brandTextColor: '#fff',
    title: 'proper smash burgers 🍔',
    subtitle: 'ace burger',
    category: 'vidéo',
    categoryIcon: '🎬',
    overlayText: ''
  },
  {
    id: 3,
    image: 'assets/images/projects/mamabubbele-thumb.jpg',
    video: 'assets/videos/project-mamabubbele.mp4',
    brand: 'mama bubbele',
    brandColor: '#FFD700',
    brandTextColor: '#000',
    title: 'la classe 😎',
    subtitle: 'tf1 alsace',
    category: 'reportage',
    categoryIcon: '📺',
    overlayText: ''
  },
  {
    id: 4,
    image: 'assets/images/projects/toastiversaire-thumb.jpg',
    video: 'assets/videos/project-toastiversaire.mp4',
    brand: 'toast family',
    brandColor: '#FF1493',
    brandTextColor: '#fff',
    title: 'toastiversaire 🎉🎂',
    subtitle: 'nos gagas',
    category: 'team',
    categoryIcon: '🎊',
    overlayText: ''
  },
  {
    id: 5,
    image: 'assets/images/projects/dazio-thumb.jpg',
    video: 'assets/videos/project-dazio.mp4',
    brand: 'dazio',
    brandColor: '#E74C3C',
    brandTextColor: '#fff',
    title: 'ça arrive lundi 🍕',
    subtitle: 'strasbourg',
    category: 'vidéo',
    categoryIcon: '🍕',
    overlayText: ''
  },
  {
    id: 6,
    image: 'assets/images/projects/alelor-thumb.jpg',
    video: 'assets/videos/project-alelor.mp4',
    brand: 'alélor',
    brandColor: '#FF4500',
    brandTextColor: '#fff',
    title: 'hot sauce challenge 🔥',
    subtitle: 'soirée dégustation',
    category: 'événement',
    categoryIcon: '🌶️',
    overlayText: ''
  }
];

// ===========================================
// State
// ===========================================
let rotation = 0;
let isDragging = false;
let startX = 0;
let startRotation = 0;
let velocity = 0;
let lastX = 0;
let lastTime = 0;
let animationId = null;
let isOverWrapper = false;

// ===========================================
// Constants
// ===========================================
const CARD_COUNT = projects.length;
const ROTATION_PER_CARD = 360 / CARD_COUNT;
const FAN_ROTATION_MULTIPLIER = 0.12;  // How much each card rotates
const FAN_TRANSLATE_MULTIPLIER = 1.0;  // Horizontal spread

// ===========================================
// DOM Elements
// ===========================================
const container = document.getElementById('cardsContainer');
const wrapper = document.getElementById('cardsWrapper');
const dotsContainer = document.getElementById('dots');
const brandBadge = document.getElementById('brandBadge');
const projectTitle = document.getElementById('projectTitle');
const cursorLabel = document.getElementById('cursorLabel');

// ===========================================
// Create Cards
// ===========================================
function createCards() {
  projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-inner">
        <img src="${project.image}" alt="${project.title}" class="card-image" draggable="false">
        <video
          class="card-video"
          src="${project.video}"
          muted
          loop
          playsinline
          preload="metadata"
        ></video>
        ${project.overlayText ? `
          <div class="card-overlay">
            <span class="overlay-text">${project.overlayText}</span>
          </div>
        ` : ''}
        <div class="category-badge">
          <span class="category-icon">${project.categoryIcon}</span>
          <span>${project.category}</span>
        </div>
        <button class="sound-toggle-card" aria-label="Toggle sound">
          <svg class="icon-muted" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2"/>
            <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2"/>
          </svg>
          <svg class="icon-unmuted" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// ===========================================
// Create Dots
// ===========================================
function createDots() {
  projects.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.addEventListener('click', () => snapToCard(index));
    dotsContainer.appendChild(dot);
  });
}

// ===========================================
// Get Center Index
// ===========================================
function getCenterIndex() {
  let normalizedRotation = ((rotation % 360) + 360) % 360;
  let index = Math.round(normalizedRotation / ROTATION_PER_CARD) % CARD_COUNT;
  return index;
}

// ===========================================
// Update Cards Position
// ===========================================
function updateCards() {
  const cards = document.querySelectorAll('.card');
  const centerIndex = getCenterIndex();

  cards.forEach((card, index) => {
    const cardBaseAngle = index * ROTATION_PER_CARD;
    let angleDiff = cardBaseAngle - (rotation % 360);
    
    // Normalize to -180 to 180
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff < -180) angleDiff += 360;

    // Calculate transforms
    const cardRotation = angleDiff * FAN_ROTATION_MULTIPLIER;
    const translateX = angleDiff * FAN_TRANSLATE_MULTIPLIER;
    const absAngle = Math.abs(angleDiff);
    const scale = 1 - (absAngle * 0.001);
    const zIndex = Math.round(50 - absAngle);
    const opacity = Math.max(0.5, 1 - (absAngle * 0.004));

    // Apply transforms
    card.style.transform = `
      translateX(calc(-50% + ${translateX}px))
      rotate(${cardRotation}deg)
      scale(${Math.max(0.85, scale)})
    `;
    card.style.left = '50%';
    card.style.zIndex = zIndex;
    card.style.opacity = opacity;
    card.style.transition = isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease';

    // Handle center card state
    const isCenter = index === centerIndex && absAngle < ROTATION_PER_CARD / 2;
    const video = card.querySelector('.card-video');
    
    if (isCenter && !isDragging) {
      card.classList.add('is-center');
      video.play().catch(() => {});
    } else {
      card.classList.remove('is-center');
      video.pause();
    }
  });

  // Update dots
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === centerIndex);
  });

  // Update project info
  const project = projects[centerIndex];
  if (project) {
    brandBadge.textContent = project.brand;
    brandBadge.style.backgroundColor = project.brandColor;
    brandBadge.style.color = project.brandTextColor;
    
    if (project.subtitle) {
      projectTitle.innerHTML = `${project.title}<span>${project.subtitle}</span>`;
    } else {
      projectTitle.innerHTML = project.title;
    }
  }
}

// ===========================================
// Snap to Card
// ===========================================
function snapToCard(targetIndex) {
  cancelAnimationFrame(animationId);
  
  let targetRotation = targetIndex * ROTATION_PER_CARD;
  let currentNormalized = ((rotation % 360) + 360) % 360;
  let diff = targetRotation - currentNormalized;
  
  // Find shortest path
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  
  rotation += diff;
  velocity = 0;
  updateCards();
}

function snapToNearest() {
  const targetIndex = getCenterIndex();
  snapToCard(targetIndex);
}

// ===========================================
// Momentum Animation
// ===========================================
function animate() {
  if (Math.abs(velocity) > 0.1) {
    rotation += velocity;
    velocity *= 0.92; // Friction
    updateCards();
    animationId = requestAnimationFrame(animate);
  } else {
    snapToNearest();
  }
}

// ===========================================
// Drag Handlers
// ===========================================
function handleDragStart(e) {
  e.preventDefault();
  cancelAnimationFrame(animationId);
  
  isDragging = true;
  wrapper.classList.add('is-dragging');
  
  startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  startRotation = rotation;
  lastX = startX;
  lastTime = Date.now();
  velocity = 0;

  // Update cursor state
  if (isOverWrapper) {
    window.cursorManager.switchCursor('dragging');
    cursorLabel.style.opacity = '0';
    cursorLabel.style.transform = 'scale(0.8)';
  }

  // Add dragging class to cards & pause videos
  document.querySelectorAll('.card').forEach(c => c.classList.add('is-dragging'));
  document.querySelectorAll('.card-video').forEach(v => v.pause());
}

function handleDragMove(e) {
  if (!isDragging) return;

  const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const deltaX = currentX - startX;
  
  // Track velocity
  const now = Date.now();
  const dt = now - lastTime;
  if (dt > 0) {
    velocity = (currentX - lastX) / dt * 12;
  }
  lastX = currentX;
  lastTime = now;

  // Update rotation
  rotation = startRotation - (deltaX * 0.25);
  updateCards();
}

function handleDragEnd() {
  if (!isDragging) return;

  isDragging = false;
  wrapper.classList.remove('is-dragging');
  document.querySelectorAll('.card').forEach(c => c.classList.remove('is-dragging'));

  // Update cursor state
  if (isOverWrapper) {
    window.cursorManager.switchCursor('drag');
    cursorLabel.style.opacity = '1';
    cursorLabel.style.transform = 'scale(1)';
  }

  // Apply momentum or snap
  if (Math.abs(velocity) > 1.5) {
    velocity = -velocity * 0.4;
    animationId = requestAnimationFrame(animate);
  } else {
    snapToNearest();
  }
}

// ===========================================
// Custom Cursor Label (Smooth Follow)
// ===========================================
let labelTargetX = 0;
let labelTargetY = 0;
let labelCurrentX = 0;
let labelCurrentY = 0;
let labelAnimationFrameId = null;
const labelEasing = 0.15;

function animateCursorLabel() {
  // Interpolation vers la position cible
  labelCurrentX += (labelTargetX - labelCurrentX) * labelEasing;
  labelCurrentY += (labelTargetY - labelCurrentY) * labelEasing;

  // Appliquer la position
  cursorLabel.style.left = labelCurrentX + 'px';
  cursorLabel.style.top = labelCurrentY + 'px';

  // Continuer l'animation si on est sur le wrapper
  if (isOverWrapper && !isDragging) {
    labelAnimationFrameId = requestAnimationFrame(animateCursorLabel);
  } else {
    labelAnimationFrameId = null;
  }
}

function updateCursorLabel(e) {
  const x = e.clientX;
  const y = e.clientY;

  // Mettre à jour la cible (pas la position directe)
  labelTargetX = x + 50;
  labelTargetY = y + 50;

  // Lancer l'animation si pas déjà active
  if (!labelAnimationFrameId) {
    labelCurrentX = labelTargetX; // Init position au premier mouvement
    labelCurrentY = labelTargetY;
    labelAnimationFrameId = requestAnimationFrame(animateCursorLabel);
  }
}

// ===========================================
// Event Listeners
// ===========================================
function initEventListeners() {
  // Drag events
  wrapper.addEventListener('mousedown', handleDragStart);
  wrapper.addEventListener('touchstart', handleDragStart, { passive: false });
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('touchmove', handleDragMove, { passive: true });
  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchend', handleDragEnd);
  wrapper.addEventListener('dragstart', e => e.preventDefault());

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const current = getCenterIndex();
    if (e.key === 'ArrowLeft') {
      snapToCard((current - 1 + CARD_COUNT) % CARD_COUNT);
    } else if (e.key === 'ArrowRight') {
      snapToCard((current + 1) % CARD_COUNT);
    }
  });

  // Custom cursor on carousel
  wrapper.addEventListener('mouseenter', () => {
    isOverWrapper = true;
    if (!isDragging) {
      window.cursorManager.switchCursor('drag');
      cursorLabel.style.opacity = '1';
      cursorLabel.style.transform = 'scale(1)';
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    isOverWrapper = false;
    window.cursorManager.switchCursor('default');
    cursorLabel.style.opacity = '0';
    cursorLabel.style.transform = 'scale(0.8)';
  });

  wrapper.addEventListener('mousemove', updateCursorLabel);
}

// ===========================================
// Sound Toggle for Cards
// ===========================================
function initSoundToggles() {
  const soundButtons = document.querySelectorAll('.sound-toggle-card');

  soundButtons.forEach((btn, index) => {
    const card = btn.closest('.card');
    const video = card.querySelector('.card-video');

    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Éviter de déclencher le drag

      if (video.muted) {
        video.muted = false;
        btn.classList.add('unmuted');
      } else {
        video.muted = true;
        btn.classList.remove('unmuted');
      }
    });
  });
}

// ===========================================
// Initialize
// ===========================================
function init() {
  createCards();
  createDots();
  initEventListeners();
  initSoundToggles();
  
  // Start at middle card
  rotation = 2 * ROTATION_PER_CARD;
  updateCards();
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
