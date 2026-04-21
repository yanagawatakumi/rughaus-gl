const productCache = new Map();
const STORAGE_KEY_HANDLES = 'viewedProductHandles';

function getStoredHandles() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY_HANDLES) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

class RecentlyViewedProductsSection extends HTMLElement {
  connectedCallback() {
    if (this.dataset.initialized === 'true') return;
    this.dataset.initialized = 'true';
    // This section can start as hidden, so IntersectionObserver may never fire.
    // Load once on idle to keep it reliable on both preview and production.
    const run = () => this.loadProducts();
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(run, { timeout: 500 });
    } else {
      window.setTimeout(run, 0);
    }
  }

  async loadProducts() {
    const currentHandle = this.dataset.currentHandle || '';
    const sectionLimit = Number.parseInt(this.dataset.maxProducts || '4', 10) || 4;
    const currency = this.dataset.currency || 'USD';

    const viewedHandles = getStoredHandles()
      .filter((handle) => typeof handle === 'string' && handle.length > 0)
      .filter((handle) => handle !== currentHandle)
      .slice(0, sectionLimit);

    if (viewedHandles.length === 0) {
      this.hidden = true;
      return;
    }

    const products = await this.fetchProducts(viewedHandles);
    const validProducts = products.filter(Boolean).slice(0, sectionLimit);

    if (validProducts.length === 0) {
      this.hidden = true;
      return;
    }

    const grid = this.querySelector('[ref="recentlyViewedGrid"]');
    if (!(grid instanceof HTMLElement)) {
      this.hidden = true;
      return;
    }

    grid.innerHTML = '';
    validProducts.forEach((product) => {
      grid.append(this.renderCard(product, currency));
    });

    this.hidden = false;
  }

  async fetchProducts(handles) {
    const root = window.Shopify?.routes?.root || '/';
    const previewParams = new URLSearchParams(window.location.search);

    const requests = handles.map(async (handle) => {
      if (productCache.has(handle)) return productCache.get(handle);

      const url = new URL(`${root}products/${encodeURIComponent(handle)}.js`, window.location.origin);
      previewParams.forEach((value, key) => {
        if (!url.searchParams.has(key)) {
          url.searchParams.set(key, value);
        }
      });

      try {
        const response = await fetch(url.toString(), { credentials: 'same-origin' });
        if (!response.ok) return null;
        const data = await response.json();
        productCache.set(handle, data);
        return data;
      } catch {
        return null;
      }
    });

    return Promise.all(requests);
  }

  renderCard(product, currency) {
    const item = document.createElement('li');
    item.className = 'recently-viewed-products__item';

    const link = document.createElement('a');
    link.className = 'recently-viewed-products__card-link';
    link.href = product.url || `/products/${product.handle}`;

    const imageWrap = document.createElement('div');
    imageWrap.className = 'recently-viewed-products__image-wrap';

    if (Array.isArray(product.images) && product.images[0]) {
      const img = document.createElement('img');
      img.className = 'recently-viewed-products__image';
      img.src = product.images[0];
      img.alt = product.title || '';
      img.loading = 'lazy';
      imageWrap.append(img);
    }

    const name = document.createElement('p');
    name.className = 'recently-viewed-products__name';
    name.textContent = product.title || '';

    const price = document.createElement('p');
    price.className = 'recently-viewed-products__price';
    price.textContent = this.formatMoney(product.price, currency);

    link.append(imageWrap, name, price);
    item.append(link);

    return item;
  }

  formatMoney(cents, currency) {
    const value = Number(cents || 0) / 100;

    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
      }).format(value);
    } catch {
      return `$${value.toFixed(2)}`;
    }
  }
}

if (!customElements.get('recently-viewed-products-section')) {
  customElements.define('recently-viewed-products-section', RecentlyViewedProductsSection);
}
