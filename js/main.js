const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

function productCard(product) {
  const isSignature = SIGNATURE_PRODUCT_NAMES.includes(product.name);
  const badge = isSignature ? "Signature" : product.category;
  const defaultWeight = Object.keys(product.prices)[0];
  return `
    <article class="product-card" data-product-card="${product.id}">
      <div class="product-image">
        <span class="badge">${badge}</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <div class="product-title">
          <h3>${product.name}</h3>
        </div>
        <p>${product.description}</p>
        <div class="price-row">
          <strong data-price-for="${product.id}">${currency(product.prices[defaultWeight])}</strong>
          <button class="text-btn" data-quick-view="${product.id}">Quick view</button>
        </div>
        <div class="selectors">
          <label>Weight
            <select data-weight-for="${product.id}">
              ${Object.keys(product.prices).map((weight) => `<option value="${weight}">${weight}</option>`).join("")}
            </select>
          </label>
          <label>Qty
            <div class="qty-stepper">
              <button data-qty-minus="${product.id}" aria-label="Decrease quantity">−</button>
              <input value="1" min="1" max="99" inputmode="numeric" data-qty-for="${product.id}" aria-label="Quantity for ${product.name}" />
              <button data-qty-plus="${product.id}" aria-label="Increase quantity">+</button>
            </div>
          </label>
        </div>
        <button class="btn btn-primary add-cart" data-add="${product.id}">Add To Cart</button>
      </div>
    </article>`;
}

function renderFeaturedProducts() {
  qs("#featuredGrid").innerHTML = products
    .filter((product) => SIGNATURE_PRODUCT_NAMES.includes(product.name))
    .map(productCard)
    .join("");
}

function renderProducts() {
  const list = filteredProducts();
  qs("#productGrid").innerHTML = list.map(productCard).join("");
  qs("#emptyState").hidden = list.length > 0;
  observeReveals();
}

function renderCategoryFilter() {
  qs("#categoryFilter").innerHTML = categories.map((category) => `<option value="${category}">${category}</option>`).join("");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  qs("#toastStack").appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

function openCart() {
  qs("#cartDrawer").classList.add("open");
  qs("#cartDrawer").setAttribute("aria-hidden", "false");
}

function closeCart() {
  qs("#cartDrawer").classList.remove("open");
  qs("#cartDrawer").setAttribute("aria-hidden", "true");
}

function openQuickView(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  rememberProduct(productId);
  const prices = Object.values(product.prices);
  const priceText = prices.length === 1
    ? currency(prices[0])
    : `${currency(Math.min(...prices))} - ${currency(Math.max(...prices))}`;
  qs("#quickView").innerHTML = `
    <div class="quick-backdrop" data-close-quick></div>
    <article class="quick-panel" role="dialog" aria-modal="true" aria-label="${product.name}">
      <button class="icon-btn" data-close-quick aria-label="Close quick view">×</button>
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <p class="eyebrow">${product.category}</p>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <strong>${priceText}</strong>
        <button class="btn btn-primary" data-add="${product.id}">Add To Cart</button>
      </div>
    </article>`;
  qs("#quickView").classList.add("open");
  qs("#quickView").setAttribute("aria-hidden", "false");
}

function closeQuickView() {
  qs("#quickView").classList.remove("open");
  qs("#quickView").setAttribute("aria-hidden", "true");
}

function openNameModal() {
  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }
  qs("#nameModal").classList.add("open");
  qs("#nameModal").setAttribute("aria-hidden", "false");
  const input = qs("#customerNameInput");
  input.value = "";
  setTimeout(() => input.focus(), 50);
}

function closeNameModal() {
  qs("#nameModal").classList.remove("open");
  qs("#nameModal").setAttribute("aria-hidden", "true");
}

function confirmNameAndSend() {
  const input = qs("#customerNameInput");
  const name = input.value.trim();
  if (!name) {
    showToast("Please enter your name");
    input.focus();
    return;
  }
  generateWhatsAppOrder(name);
  closeNameModal();
}

function bindEvents() {
  qs("#openCart").addEventListener("click", openCart);
  qs("#floatingCart").addEventListener("click", openCart);
  qs("#closeCart").addEventListener("click", closeCart);
  qs("#cartBackdrop").addEventListener("click", closeCart);
  qs("#clearCart").addEventListener("click", clearCartItems);
  qs("#buyNow").addEventListener("click", openNameModal);
  qs("#closeNameModal").addEventListener("click", closeNameModal);
  qs("#nameModalBackdrop").addEventListener("click", closeNameModal);
  qs("#confirmNameBtn").addEventListener("click", confirmNameAndSend);
  qs("#customerNameInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") confirmNameAndSend();
  });

  qs("#productSearch").addEventListener("input", (event) => setSearchTerm(event.target.value));

  qs("#categoryFilter").addEventListener("change", (event) => setCategory(event.target.value));
  qs("#sortSelect").addEventListener("change", (event) => {
    activeSort = event.target.value;
    renderProducts();
  });

  qs("#themeToggle").addEventListener("change", (event) => {
    const next = event.target.checked ? "dark" : "light";
    document.body.classList.toggle("dark", event.target.checked);
    localStorage.setItem(STORAGE_KEYS.theme, next);
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;

    if (target.dataset.category) {
      setCategory(target.dataset.category);
      if (target.classList.contains("specialty-panel")) {
        qs("#products").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (target.dataset.footerCategory) setCategory(target.dataset.footerCategory);
    if (target.dataset.quickView) openQuickView(Number(target.dataset.quickView));
    if (target.dataset.closeQuick !== undefined) closeQuickView();

    if (target.dataset.qtyPlus || target.dataset.qtyMinus) {
      const id = target.dataset.qtyPlus || target.dataset.qtyMinus;
      const input = qs(`[data-qty-for="${id}"]`, target.closest(".product-card"));
      input.value = Math.max(1, Number(input.value || 1) + (target.dataset.qtyPlus ? 1 : -1));
    }

    if (target.dataset.add) {
      const id = Number(target.dataset.add);
      const product = products.find((item) => item.id === id);
      const card = target.closest(".product-card");
      const weight = card ? qs(`[data-weight-for="${id}"]`, card).value : Object.keys(product.prices)[0];
      const quantity = card ? Number(qs(`[data-qty-for="${id}"]`, card).value || 1) : 1;
      addToCart(id, weight, quantity);
    }

    if (target.dataset.cartInc) changeCartQuantity(Number(target.dataset.cartInc), target.dataset.weight, 1);
    if (target.dataset.cartDec) changeCartQuantity(Number(target.dataset.cartDec), target.dataset.weight, -1);
    if (target.dataset.cartRemove) removeCartItem(Number(target.dataset.cartRemove), target.dataset.weight);
  });

  document.addEventListener("change", (event) => {
    if (!event.target.matches("[data-weight-for]")) return;
    const id = Number(event.target.dataset.weightFor);
    const product = products.find((item) => item.id === id);
    qs(`[data-price-for="${id}"]`, event.target.closest(".product-card")).textContent = currency(product.prices[event.target.value]);
  });

  qs("#backTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function observeReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  qsa(".reveal, .reveal-left, .reveal-right").forEach((item) => {
    if (!item.classList.contains("visible")) observer.observe(item);
  });
}

function handleScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = qs("#scrollProgress");
  if (scrollProgress) scrollProgress.style.width = `${(window.scrollY / max) * 100}%`;
  qs("#siteHeader").classList.toggle("scrolled", window.scrollY > 20);
  qs("#backTop").classList.toggle("show", window.scrollY > 500);

  const products = qs("#products");
  if (products) {
    const header = qs("#siteHeader");
    const headerHeight = header ? header.offsetHeight : 0;
    const reachedProducts = window.scrollY >= products.offsetTop - headerHeight - 40;
    qs("#floatingCart").classList.toggle("show", reachedProducts);
    qs(".floating-whatsapp").classList.toggle("show", reachedProducts);
  }
}

function init() {
  const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  const isDark = storedTheme === null ? true : storedTheme === "dark";
  document.body.classList.toggle("dark", isDark);
  qs("#themeToggle").checked = isDark;
  qs("#year").textContent = new Date().getFullYear();
  renderCategoryFilter();
  renderFeaturedProducts();
  renderProducts();
  renderCart();
  bindEvents();
  observeReveals();
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  const loader = qs("#loader");
  if (loader) setTimeout(() => loader.classList.add("hide"), 650);
}

document.addEventListener("DOMContentLoaded", init);