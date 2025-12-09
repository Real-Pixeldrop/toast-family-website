/* ===========================================
   FLICK PREVIEW - Effet aperçu projets au hover
   Images qui s'empilent à côté du curseur
   Fonctionne sur tous les liens avec data-preview="true"
   =========================================== */

(function() {
  'use strict';

  // Get all preview links (nav, footer, flick section)
  const previewLinks = document.querySelectorAll('[data-preview="true"]');
  const previewStack = document.getElementById('flickPreviewStack');

  if (previewLinks.length === 0 || !previewStack) return;

  const images = previewStack.querySelectorAll('.flick-preview-img');
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
  let currentLink = null; // Track which link is being hovered
  let positionBelow = false; // Whether to position stack below cursor (for nav links)

  const INTERVAL = 150; // Fast interval for GIF-like effect
  const EASING = 0.15; // Smooth follow
  const MAX_VISIBLE = 5; // Max visible stacked images

  // Track active images for stacking effect
  let activeImages = [];

  function updateStackPosition() {
    // Smooth follow cursor
    stackX += (mouseX - stackX) * EASING;
    stackY += (mouseY - stackY) * EASING;

    // Position below and left of cursor for nav links, above and right for footer links
    const offsetX = positionBelow ? -100 : 25;
    const offsetY = positionBelow ? 30 : -130;
    previewStack.style.transform = `translate(${stackX + offsetX}px, ${stackY + offsetY}px)`;

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

  function startPreview(e) {
    const link = e.currentTarget;

    // If already hovering this same link, just update mouse position
    if (currentLink === link && isHovering) {
      return;
    }

    // Stop any existing preview first
    if (intervalId || isHovering) {
      stopPreviewImmediate();
    }

    currentLink = link;
    isHovering = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    stackX = mouseX;
    stackY = mouseY;

    // Check if link is in nav (top of page) - position below cursor
    positionBelow = link.closest('.hero-nav') !== null;

    previewStack.classList.add('is-visible');

    // Show first image immediately
    showNextImage();

    // Start interval for subsequent images
    intervalId = setInterval(showNextImage, INTERVAL);

    // Start position tracking
    animationFrameId = requestAnimationFrame(updateStackPosition);
  }

  function stopPreviewImmediate() {
    isHovering = false;
    currentLink = null;
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

    // Reset all images immediately
    images.forEach(img => {
      img.classList.remove('is-active');
      img.style.removeProperty('--z-index');
    });
    activeImages = [];
    currentIndex = 0;
    zIndexCounter = 1;
  }

  function stopPreview(e) {
    const link = e.currentTarget;

    // Only stop if leaving the currently active link
    if (currentLink !== link) {
      return;
    }

    isHovering = false;
    currentLink = null;
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
      if (!isHovering) {
        images.forEach(img => {
          img.classList.remove('is-active');
          img.style.removeProperty('--z-index');
        });
        activeImages = [];
        currentIndex = 0;
        zIndexCounter = 1;
      }
    }, 200);
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  // Attach event listeners to all preview links
  previewLinks.forEach(link => {
    link.addEventListener('mouseenter', startPreview);
    link.addEventListener('mouseleave', stopPreview);
    link.addEventListener('mousemove', handleMouseMove);
  });

  console.log('Flick preview initialized on', previewLinks.length, 'links with', totalImages, 'images');

})();
