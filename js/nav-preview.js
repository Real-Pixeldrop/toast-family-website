/* ===========================================
   NAV PREVIEW - Effet aperçu projets au hover
   Images qui s'empilent à côté du curseur
   =========================================== */

(function() {
  'use strict';

  const navLink = document.getElementById('navProjets');
  const previewStack = document.getElementById('navPreviewStack');

  if (!navLink || !previewStack) return;

  const images = previewStack.querySelectorAll('.nav-preview-img');
  const totalImages = images.length;

  let isHovering = false;
  let currentIndex = 0;
  let intervalId = null;
  let zIndexCounter = 1;
  let mouseX = 0;
  let mouseY = 0;
  let stackX = 0;
  let stackY = 0;
  let animationFrameId = null;

  const INTERVAL = 150; // Très rapide pour effet GIF
  const EASING = 0.15; // Smooth follow
  const MAX_VISIBLE = 5; // Nombre max d'images visibles empilées

  // Track active images for stacking effect
  let activeImages = [];

  function updateStackPosition() {
    // Smooth follow cursor
    stackX += (mouseX - stackX) * EASING;
    stackY += (mouseY - stackY) * EASING;

    // Position décalée à droite et en bas du curseur
    previewStack.style.left = (stackX + 30) + 'px';
    previewStack.style.top = (stackY + 20) + 'px';

    if (isHovering) {
      animationFrameId = requestAnimationFrame(updateStackPosition);
    }
  }

  function showNextImage() {
    // Get next image
    const img = images[currentIndex];

    // Increment z-index for stacking effect
    zIndexCounter++;
    img.style.setProperty('--z-index', zIndexCounter);

    // Add to active stack
    activeImages.push(img);
    img.classList.add('is-active');

    // Remove oldest if exceeding max
    if (activeImages.length > MAX_VISIBLE) {
      const oldestImg = activeImages.shift();
      oldestImg.classList.remove('is-active');
    }

    // Move to next image
    currentIndex = (currentIndex + 1) % totalImages;
  }

  function startPreview() {
    if (intervalId) return;

    isHovering = true;
    previewStack.classList.add('is-visible');

    // Show first image immediately
    showNextImage();

    // Start interval for subsequent images
    intervalId = setInterval(showNextImage, INTERVAL);

    // Start position tracking
    animationFrameId = requestAnimationFrame(updateStackPosition);
  }

  function stopPreview() {
    isHovering = false;
    previewStack.classList.remove('is-visible');

    // Clear interval
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    // Cancel animation frame
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    // Reset all images after fade out
    setTimeout(() => {
      images.forEach(img => {
        img.classList.remove('is-active');
        img.style.removeProperty('--z-index');
      });
      activeImages = [];
      currentIndex = 0;
      zIndexCounter = 1;
    }, 200);
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  // Event listeners
  navLink.addEventListener('mouseenter', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    stackX = mouseX;
    stackY = mouseY;
    startPreview();
  });

  navLink.addEventListener('mouseleave', stopPreview);

  navLink.addEventListener('mousemove', handleMouseMove);

  console.log('Nav preview initialized with', totalImages, 'images');

})();
