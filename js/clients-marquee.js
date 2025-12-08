/**
 * Clients Double Marquee Animation - Style Truus
 * Animation verticale infinie avec deux colonnes
 */

(function() {
  'use strict';

  const pixelsPerSecond = 75;
  const themeCycle = ['a', 'b', 'c', 'd'];

  function initCSSMarquee() {
    const initContainers = document.querySelectorAll('[data-css-marquee-init]');

    initContainers.forEach(init => {
      const marquees = init.querySelectorAll('[data-css-marquee]');
      const items = [];

      // Collect all items
      marquees.forEach(marquee => {
        marquee.querySelectorAll('[data-css-marquee-item]').forEach(item => {
          items.push(item.cloneNode(true));
        });
      });

      // Shuffle utility
      function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      }

      const shuffledItems = shuffleArray(items);
      const lists = init.querySelectorAll('[data-css-marquee-list]');
      const groupCount = lists.length;

      // Clear existing items
      lists.forEach(list => {
        list.innerHTML = '';
      });

      // Distribute and assign data-logo-theme
      shuffledItems.forEach((item, index) => {
        const groupIndex = index % groupCount;
        const targetList = lists[groupIndex];

        targetList.appendChild(item);

        const itemsInList = targetList.querySelectorAll('[data-css-marquee-item]');
        itemsInList.forEach((listItem, i) => {
          listItem.setAttribute('data-logo-theme', themeCycle[i % themeCycle.length]);
        });
      });

      // Duplicate each list for infinite scroll effect
      lists.forEach(list => {
        const clone = list.cloneNode(true);
        list.parentNode.appendChild(clone);
      });

      // Observer to toggle animation play state
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const listsInMarquee = entry.target.querySelectorAll('[data-css-marquee-list]');
          listsInMarquee.forEach(list => {
            list.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
          });
        });
      }, { threshold: 0 });

      // Set animation duration based on content height
      init.querySelectorAll('[data-css-marquee-list]').forEach(list => {
        const height = list.offsetHeight;
        const duration = height / pixelsPerSecond;
        list.style.animationDuration = duration + 's';
        list.style.animationPlayState = 'paused';
      });

      // Observe each marquee container
      marquees.forEach(marquee => {
        observer.observe(marquee);
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCSSMarquee);
  } else {
    initCSSMarquee();
  }

  // Re-initialize on resize (debounced)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      document.querySelectorAll('[data-css-marquee-init]').forEach(init => {
        init.querySelectorAll('[data-css-marquee-list]').forEach(list => {
          const height = list.offsetHeight;
          const duration = height / pixelsPerSecond;
          list.style.animationDuration = duration + 's';
        });
      });
    }, 250);
  });

  console.log('Clients marquee animation initialized');
})();
