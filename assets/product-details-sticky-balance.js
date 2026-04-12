const DESKTOP_MEDIA_QUERY = window.matchMedia('(min-width: 750px)');
const STICKY_MODE_TOP = 'top';
const STICKY_MODE_BOTTOM = 'bottom';
const DIRECTION_CHANGE_THRESHOLD = 2;

/**
 * Keeps PDP details sticky behavior balanced:
 * - Short content stays pinned below header
 * - Tall content scrolls first, then pins when lower edge is reached
 * @param {HTMLElement} section
 */
const initSection = (section) => {
  const details = section.querySelector('.product-details.sticky-content--desktop');
  if (!details || details.dataset.stickyBalanceInitialized === 'true') return;

  const detailsContent = details.querySelector('.group-block') ?? details;
  let lastScrollY = window.scrollY;

  const setStickyMode = (mode) => {
    if (details.dataset.stickyMode !== mode) {
      details.dataset.stickyMode = mode;
    }
  };

  const syncHeight = () => {
    if (!DESKTOP_MEDIA_QUERY.matches) {
      details.style.removeProperty('--pdp-details-height');
      return;
    }

    const nextHeight = Math.ceil(detailsContent.getBoundingClientRect().height);
    if (!nextHeight) return;
    details.style.setProperty('--pdp-details-height', `${nextHeight}px`);
  };

  const rafSyncHeight = () => window.requestAnimationFrame(syncHeight);
  const burstSyncHeight = (duration = 500) => {
    const start = performance.now();

    const tick = () => {
      syncHeight();
      if (performance.now() - start < duration) {
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);
  };

  const resizeObserver = new ResizeObserver(rafSyncHeight);
  resizeObserver.observe(detailsContent);

  // Recalculate while accordion content is opening/closing.
  section.addEventListener(
    'toggle',
    (event) => {
      if (!(event.target instanceof HTMLDetailsElement)) return;
      burstSyncHeight();
    },
    true
  );

  // Some browsers animate details content without reliable resize callbacks.
  section.addEventListener(
    'transitionend',
    (event) => {
      const target = /** @type {HTMLElement | null} */ (event.target instanceof HTMLElement ? event.target : null);
      if (!target) return;
      if (target.classList.contains('details-content') || target.closest('accordion-custom')) {
        burstSyncHeight(250);
      }
    },
    true
  );

  const onViewportChange = () => {
    if (!DESKTOP_MEDIA_QUERY.matches) {
      setStickyMode(STICKY_MODE_TOP);
    }
    lastScrollY = window.scrollY;
    rafSyncHeight();
  };

  const onScroll = () => {
    if (!DESKTOP_MEDIA_QUERY.matches) return;

    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    if (Math.abs(delta) < DIRECTION_CHANGE_THRESHOLD) {
      lastScrollY = currentScrollY;
      return;
    }

    if (delta > 0) {
      setStickyMode(STICKY_MODE_BOTTOM);
    } else {
      setStickyMode(STICKY_MODE_TOP);
    }

    lastScrollY = currentScrollY;
  };

  setStickyMode(STICKY_MODE_TOP);
  window.addEventListener('resize', onViewportChange);
  DESKTOP_MEDIA_QUERY.addEventListener('change', onViewportChange);
  window.addEventListener('scroll', onScroll, { passive: true });

  // Delay once for lazy-loaded media/fonts that can shift the details height
  window.setTimeout(rafSyncHeight, 300);
  rafSyncHeight();

  details.dataset.stickyBalanceInitialized = 'true';
};

/**
 * @param {ParentNode} [root]
 */
const initStickyBalance = (root = document) => {
  root.querySelectorAll('.product-information').forEach((section) => {
    initSection(/** @type {HTMLElement} */ (section));
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initStickyBalance());
} else {
  initStickyBalance();
}

document.addEventListener('shopify:section:load', (event) => {
  const target = /** @type {ParentNode | null} */ (event.target);
  if (!target) return;
  initStickyBalance(target);
});
