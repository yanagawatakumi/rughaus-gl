const DESKTOP_MEDIA_QUERY = window.matchMedia('(min-width: 750px)');
const MIN_SCROLL_DELTA = 1;

/**
 * @param {string} value
 * @param {number} fallback
 * @returns {number}
 */
const parsePx = (value, fallback = 0) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

/**
 * Keeps PDP details sticky behavior smooth and symmetric:
 * - Scrolling down gradually shifts the sticky anchor toward bottom limit
 * - Scrolling up gradually shifts it back toward top limit
 * @param {HTMLElement} section
 */
const initSection = (section) => {
  const details = section.querySelector('.product-details.sticky-content--desktop');
  if (!details || details.dataset.stickyBalanceInitialized === 'true') return;

  const detailsContent = details.querySelector('.group-block') ?? details;
  let lastScrollY = window.scrollY;
  let currentTop = null;

  /** @type {{detailsHeight: number, topLimit: number, bottomLimit: number, hasTravel: boolean}} */
  let stickyState = {
    detailsHeight: 0,
    topLimit: 0,
    bottomLimit: 0,
    hasTravel: false,
  };

  const applyTop = () => {
    if (currentTop === null) return;
    details.style.setProperty('--pdp-sticky-top', `${currentTop}px`);
  };

  const updateStickyState = () => {
    const detailsHeight = Math.ceil(detailsContent.getBoundingClientRect().height);
    if (detailsHeight > 0) {
      details.style.setProperty('--pdp-details-height', `${detailsHeight}px`);
    }

    const styles = getComputedStyle(details);
    const topLimit = parsePx(styles.getPropertyValue('--sticky-header-offset'), 0);
    const bottomGap = parsePx(styles.getPropertyValue('--pdp-sticky-bottom-gap'), 80);
    const bottomLimit = window.innerHeight - detailsHeight - bottomGap;
    const hasTravel = detailsHeight + topLimit + bottomGap > window.innerHeight;

    stickyState = {
      detailsHeight,
      topLimit,
      bottomLimit,
      hasTravel,
    };
  };

  const clampTop = (value) => {
    return Math.min(stickyState.topLimit, Math.max(stickyState.bottomLimit, value));
  };

  const syncLayout = (resetTop = false) => {
    if (!DESKTOP_MEDIA_QUERY.matches) {
      details.style.removeProperty('--pdp-details-height');
      details.style.removeProperty('--pdp-sticky-top');
      currentTop = null;
      lastScrollY = window.scrollY;
      return;
    }

    updateStickyState();
    if (stickyState.detailsHeight <= 0) return;

    if (!stickyState.hasTravel) {
      currentTop = stickyState.topLimit;
      applyTop();
      lastScrollY = window.scrollY;
      return;
    }

    if (resetTop || currentTop === null) {
      currentTop = stickyState.topLimit;
    }

    currentTop = clampTop(currentTop);
    applyTop();
    lastScrollY = window.scrollY;
  };

  const rafSyncLayout = () => window.requestAnimationFrame(() => syncLayout());
  const burstSyncLayout = (duration = 500) => {
    const start = performance.now();

    const tick = () => {
      syncLayout();
      if (performance.now() - start < duration) {
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);
  };

  const onScroll = () => {
    if (!DESKTOP_MEDIA_QUERY.matches) return;

    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    if (Math.abs(delta) < MIN_SCROLL_DELTA) {
      lastScrollY = currentScrollY;
      return;
    }

    // Keep header offset in sync when header sticky state changes while scrolling.
    const styles = getComputedStyle(details);
    const bottomGap = parsePx(styles.getPropertyValue('--pdp-sticky-bottom-gap'), 80);
    stickyState.topLimit = parsePx(styles.getPropertyValue('--sticky-header-offset'), stickyState.topLimit);
    stickyState.bottomLimit = window.innerHeight - stickyState.detailsHeight - bottomGap;
    stickyState.hasTravel = stickyState.detailsHeight + stickyState.topLimit + bottomGap > window.innerHeight;

    if (!stickyState.hasTravel) {
      currentTop = stickyState.topLimit;
      applyTop();
      lastScrollY = currentScrollY;
      return;
    }

    if (currentTop === null) {
      currentTop = stickyState.topLimit;
    }

    // Downward scroll moves toward bottom limit, upward toward top limit.
    currentTop = clampTop(currentTop - delta);
    applyTop();
    lastScrollY = currentScrollY;
  };

  const resizeObserver = new ResizeObserver(rafSyncLayout);
  resizeObserver.observe(detailsContent);

  section.addEventListener(
    'toggle',
    (event) => {
      if (!(event.target instanceof HTMLDetailsElement)) return;
      burstSyncLayout();
    },
    true
  );

  section.addEventListener(
    'transitionend',
    (event) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (!target) return;
      if (target.classList.contains('details-content') || target.closest('accordion-custom')) {
        burstSyncLayout(250);
      }
    },
    true
  );

  const onViewportChange = () => syncLayout(true);
  window.addEventListener('resize', onViewportChange);
  DESKTOP_MEDIA_QUERY.addEventListener('change', onViewportChange);
  window.addEventListener('scroll', onScroll, { passive: true });

  window.setTimeout(() => syncLayout(true), 300);
  syncLayout(true);

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
  const target = event.target instanceof HTMLElement ? event.target : null;
  if (!target) return;
  initStickyBalance(target);
});
