/**
 * Updates the recently viewed products in localStorage.
 */
export class RecentlyViewed {
  /** @static @constant {string} The key used to store the viewed products in session storage */
  static #STORAGE_KEY = 'viewedProducts';
  /** @static @constant {string} The key used to store the viewed product handles */
  static #STORAGE_KEY_HANDLES = 'viewedProductHandles';
  /** @static @constant {number} The maximum number of products to store */
  static #MAX_PRODUCTS = 20;

  /**
   * Adds a product to the recently viewed products list.
   * @param {string} productId - The ID of the product to add.
   * @param {string} [productHandle] - The handle of the product to add.
   */
  static addProduct(productId, productHandle = '') {
    if (productId) {
      let viewedProducts = this.getProducts();

      viewedProducts = viewedProducts.filter((/** @type {string} */ id) => id !== productId);
      viewedProducts.unshift(productId);
      viewedProducts = viewedProducts.slice(0, this.#MAX_PRODUCTS);

      localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(viewedProducts));
    }

    if (!productHandle) return;

    let viewedProductHandles = this.getProductHandles();
    viewedProductHandles = viewedProductHandles.filter((/** @type {string} */ handle) => handle !== productHandle);
    viewedProductHandles.unshift(productHandle);
    viewedProductHandles = viewedProductHandles.slice(0, this.#MAX_PRODUCTS);

    localStorage.setItem(this.#STORAGE_KEY_HANDLES, JSON.stringify(viewedProductHandles));
  }

  static clearProducts() {
    localStorage.removeItem(this.#STORAGE_KEY);
    localStorage.removeItem(this.#STORAGE_KEY_HANDLES);
  }

  /**
   * Retrieves the list of recently viewed products from session storage.
   * @returns {string[]} The list of viewed products.
   */
  static getProducts() {
    return JSON.parse(localStorage.getItem(this.#STORAGE_KEY) || '[]');
  }

  /**
   * Retrieves the list of recently viewed product handles from session storage.
   * @returns {string[]} The list of viewed product handles.
   */
  static getProductHandles() {
    return JSON.parse(localStorage.getItem(this.#STORAGE_KEY_HANDLES) || '[]');
  }
}
