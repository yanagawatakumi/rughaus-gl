const LOOP_SELECTOR = '[data-home-nk-loop]';
const TRACK_SELECTOR = '[data-home-nk-track]';
const MAIN_GROUP_SELECTOR = '[data-home-nk-group="main"]';
const NEXT_GROUP_SELECTOR = '[data-home-nk-group="next"]';

/** @type {WeakMap<HTMLElement, () => void>} */
const teardownMap = new WeakMap();

function positiveModulo(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

function setupLoop(loopElement) {
  if (!(loopElement instanceof HTMLElement) || teardownMap.has(loopElement)) return;

  const track = loopElement.querySelector(TRACK_SELECTOR);
  const mainGroup = loopElement.querySelector(MAIN_GROUP_SELECTOR);
  const nextGroup = loopElement.querySelector(NEXT_GROUP_SELECTOR);

  if (!(track instanceof HTMLElement) || !(mainGroup instanceof HTMLElement) || !(nextGroup instanceof HTMLElement)) return;

  let isAdjusting = false;
  let isPointerDown = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let activePointerId = null;
  let suppressClick = false;

  /** @type {{mainStart: number, nextStart: number, span: number} | null} */
  let metrics = null;

  const syncSlideWidth = () => {
    const styles = window.getComputedStyle(loopElement);
    const gapRaw = styles.getPropertyValue('--slideshow-gap').trim();
    const slideWidthRaw = styles.getPropertyValue('--home-nk-slide-width').trim();
    const gap = parseFloat(gapRaw) || 0;
    const slideWidth = parseFloat(slideWidthRaw);

    // Keep cards width stable in pixels to avoid overlap caused by percentage-width rounding.
    if (slideWidth > 0) {
      const fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
      const gapPx = gapRaw.endsWith('rem') ? gap * fontSize : gap;
      const containerWidth = loopElement.clientWidth || 0;
      if (containerWidth > 0) {
        const visibleCards =
          window.matchMedia('(min-width: 990px)').matches
            ? 5.6
            : window.matchMedia('(min-width: 750px)').matches
              ? 3.4
              : 1.6;
        const widthPx = (containerWidth - gapPx * (visibleCards - 1)) / visibleCards;
        if (widthPx > 0) {
          loopElement.style.setProperty('--home-nk-slide-width-px', `${widthPx}px`);
        }
      }
    }
  };

  const measure = (preservePosition = true) => {
    syncSlideWidth();

    const previousOffset = metrics ? loopElement.scrollLeft - metrics.mainStart : 0;

    const mainStart = mainGroup.offsetLeft;
    const nextStart = nextGroup.offsetLeft;
    const span = nextStart - mainStart;

    if (span <= 0) return;

    metrics = { mainStart, nextStart, span };

    isAdjusting = true;

    if (preservePosition) {
      loopElement.scrollLeft = mainStart + positiveModulo(previousOffset, span);
    } else {
      loopElement.scrollLeft = mainStart;
    }

    isAdjusting = false;
  };

  const normalizeScroll = () => {
    if (!metrics || isAdjusting) return;

    const { mainStart, nextStart, span } = metrics;
    const current = loopElement.scrollLeft;

    if (current < mainStart) {
      isAdjusting = true;
      loopElement.scrollLeft = current + span;
      isAdjusting = false;
      return;
    }

    if (current >= nextStart) {
      isAdjusting = true;
      loopElement.scrollLeft = current - span;
      isAdjusting = false;
    }
  };

  const onPointerDown = (event) => {
    if (!(event instanceof PointerEvent) || event.button !== 0) return;

    isPointerDown = true;
    isDragging = false;
    dragStartX = event.clientX;
    dragStartScroll = loopElement.scrollLeft;
    activePointerId = event.pointerId;
  };

  const onPointerMove = (event) => {
    if (!isPointerDown || !(event instanceof PointerEvent)) return;

    const deltaX = event.clientX - dragStartX;
    if (!isDragging) {
      // Treat as drag only after clear horizontal intent.
      if (Math.abs(deltaX) < 8) return;
      isDragging = true;
      suppressClick = true;
      loopElement.classList.add('is-dragging');
      if (activePointerId != null) {
        loopElement.setPointerCapture(activePointerId);
      }
    }

    loopElement.scrollLeft = dragStartScroll - deltaX;
  };

  const endPointerDrag = (event) => {
    if (!isPointerDown || !(event instanceof PointerEvent)) return;

    isPointerDown = false;

    if (isDragging) {
      isDragging = false;
      loopElement.classList.remove('is-dragging');

      if (loopElement.hasPointerCapture(event.pointerId)) {
        loopElement.releasePointerCapture(event.pointerId);
      }

      normalizeScroll();
    }

    activePointerId = null;
  };

  const onClickCapture = (event) => {
    if (suppressClick) {
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    }
  };

  const onScroll = () => normalizeScroll();
  const onResize = () => measure(true);
  const onLoad = () => measure(true);

  const resizeObserver = new ResizeObserver(() => {
    measure(true);
  });

  requestAnimationFrame(() => {
    measure(false);
  });

  loopElement.addEventListener('scroll', onScroll, { passive: true });
  loopElement.addEventListener('pointerdown', onPointerDown);
  loopElement.addEventListener('pointermove', onPointerMove);
  loopElement.addEventListener('pointerup', endPointerDrag);
  loopElement.addEventListener('pointercancel', endPointerDrag);
  loopElement.addEventListener('lostpointercapture', endPointerDrag);
  loopElement.addEventListener('click', onClickCapture, true);
  window.addEventListener('resize', onResize);
  window.addEventListener('load', onLoad);
  resizeObserver.observe(loopElement);
  resizeObserver.observe(mainGroup);

  const teardown = () => {
    loopElement.removeEventListener('scroll', onScroll);
    loopElement.removeEventListener('pointerdown', onPointerDown);
    loopElement.removeEventListener('pointermove', onPointerMove);
    loopElement.removeEventListener('pointerup', endPointerDrag);
    loopElement.removeEventListener('pointercancel', endPointerDrag);
    loopElement.removeEventListener('lostpointercapture', endPointerDrag);
    loopElement.removeEventListener('click', onClickCapture, true);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('load', onLoad);
    resizeObserver.disconnect();
    loopElement.classList.remove('is-dragging');
  };

  teardownMap.set(loopElement, teardown);
}

function initInRoot(root) {
  if (!(root instanceof Element) && !(root instanceof Document)) return;
  root.querySelectorAll(LOOP_SELECTOR).forEach((el) => setupLoop(el));
}

function teardownInRoot(root) {
  if (!(root instanceof Element) && !(root instanceof Document)) return;
  root.querySelectorAll(LOOP_SELECTOR).forEach((el) => {
    const teardown = teardownMap.get(el);
    if (teardown) {
      teardown();
      teardownMap.delete(el);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initInRoot(document));
} else {
  initInRoot(document);
}

document.addEventListener('shopify:section:load', (event) => {
  const target = event.target;
  if (target instanceof Element) initInRoot(target);
});

document.addEventListener('shopify:section:unload', (event) => {
  const target = event.target;
  if (target instanceof Element) teardownInRoot(target);
});
