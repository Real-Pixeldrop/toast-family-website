/* ===========================================
   LA TOAST FAMILY - Global Cursor Management
   =========================================== */

// ===========================================
// Elements
// ===========================================
const cursorDefault = document.getElementById('cursorDefault');
const cursorPointer = document.getElementById('cursorPointer');
const cursorDrag = document.getElementById('cursorDrag');
const cursorDragging = document.getElementById('cursorDragging');

let currentCursor = 'default';
let cursorX = 0;
let cursorY = 0;

// ===========================================
// Update Cursor Position
// ===========================================
function updateCursorPosition(e) {
  cursorX = e.clientX;
  cursorY = e.clientY;

  // Offset pour tous les curseurs
  const offsetX = 35;
  const offsetY = 35;

  cursorDefault.style.left = (cursorX + offsetX) + 'px';
  cursorDefault.style.top = (cursorY + offsetY) + 'px';

  cursorPointer.style.left = (cursorX + offsetX) + 'px';
  cursorPointer.style.top = (cursorY + offsetY) + 'px';

  cursorDrag.style.left = (cursorX + offsetX) + 'px';
  cursorDrag.style.top = (cursorY + offsetY) + 'px';

  cursorDragging.style.left = (cursorX + offsetX) + 'px';
  cursorDragging.style.top = (cursorY + offsetY) + 'px';
}

// ===========================================
// Switch Cursor Type
// ===========================================
function switchCursor(type) {
  if (currentCursor === type) return;

  // Hide all cursors
  cursorDefault.style.opacity = '0';
  cursorPointer.style.opacity = '0';
  cursorDrag.style.opacity = '0';
  cursorDragging.style.opacity = '0';

  // Show requested cursor
  switch(type) {
    case 'pointer':
      cursorPointer.style.opacity = '1';
      break;
    case 'drag':
      cursorDrag.style.opacity = '1';
      break;
    case 'dragging':
      cursorDragging.style.opacity = '1';
      break;
    default:
      cursorDefault.style.opacity = '1';
  }

  currentCursor = type;
}

// ===========================================
// Initialize Global Cursor
// ===========================================
function initGlobalCursor() {
  // Show default cursor
  cursorDefault.style.opacity = '1';

  // Track mouse movement globally
  document.addEventListener('mousemove', updateCursorPosition);

  // Pointer cursor on links, buttons, clickable elements
  const clickableSelectors = 'a, button, [role="button"], .nav-link, .view-link, .control-btn, .sound-toggle, .sound-toggle-card';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(clickableSelectors)) {
      switchCursor('pointer');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(clickableSelectors)) {
      switchCursor('default');
    }
  });
}

// Initialize on load
initGlobalCursor();

// Export for use in other modules
window.cursorManager = {
  switchCursor,
  getCurrentCursor: () => currentCursor
};
