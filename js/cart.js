const STORAGE_KEYS = {
  cart: "dfw_cart",
  wishlist: "dfw_wishlist",
  theme: "dfw_theme",
  recent: "dfw_recent",
  newsletter: "dfw_newsletter"
};

let cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || "[]");
let wishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist) || "[]");
let recent = JSON.parse(localStorage.getItem(STORAGE_KEYS.recent) || "[]");

const currency = (value) => `Rs. ${Number(value).toLocaleString("en-IN")}`;

function lowestPrice(product) {
  return Math.min(...Object.values(product.prices));
}

function selectedPrice(product, weight) {
  return product.prices[weight] ?? product.prices[Object.keys(product.prices)[0]];
}

function saveCart() {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  renderCart();
}

function saveWishlist() {
  localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
  renderProducts();
  renderFeaturedProducts();
}

function rememberProduct(productId) {
  recent = [productId, ...recent.filter((id) => id !== productId)].slice(0, 8);
  localStorage.setItem(STORAGE_KEYS.recent, JSON.stringify(recent));
}

function addToCart(productId, weight, quantity = 1) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  const existing = cart.find((item) => item.id === productId && item.weight === weight);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, weight, quantity });
  }
  rememberProduct(productId);
  saveCart();
  showToast(`${product.name} (${weight}) added to cart`);
}

function changeCartQuantity(productId, weight, delta) {
  cart = cart.map((item) => {
    if (item.id === productId && item.weight === weight) {
      return { ...item, quantity: Math.max(1, item.quantity + delta) };
    }
    return item;
  });
  saveCart();
}

function removeCartItem(productId, weight) {
  cart = cart.filter((item) => !(item.id === productId && item.weight === weight));
  saveCart();
}

function clearCartItems() {
  cart = [];
  saveCart();
}

function toggleWishlist(productId) {
  wishlist = wishlist.includes(productId)
    ? wishlist.filter((id) => id !== productId)
    : [...wishlist, productId];
  saveWishlist();
}

function cartTotals() {
  return cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? selectedPrice(product, item.weight) * item.quantity : 0);
  }, 0);
}

let previousCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

function bumpBadge(el) {
  if (!el) return;
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cartCount");
  const floatingCountEl = document.getElementById("floatingCartCount");
  cartCountEl.textContent = count;
  floatingCountEl.textContent = count;

  if (count > previousCartCount) {
    bumpBadge(cartCountEl);
    bumpBadge(floatingCountEl);
  }
  previousCartCount = count;

  if (!cart.length) {
    cartItems.innerHTML = `<div class="cart-empty"><strong>Your cart is empty.</strong><p>Add premium products and send the order on WhatsApp.</p></div>`;
  } else {
    cartItems.innerHTML = cart.map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      if (!product) return "";
      const lineTotal = selectedPrice(product, item.weight) * item.quantity;
      return `
        <article class="cart-item">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div>
            <h3>${product.name}</h3>
            <p>${item.weight} · ${currency(product.prices[item.weight])}</p>
            <div class="qty-row">
              <button aria-label="Decrease ${product.name}" data-cart-dec="${product.id}" data-weight="${item.weight}">−</button>
              <span>${item.quantity}</span>
              <button aria-label="Increase ${product.name}" data-cart-inc="${product.id}" data-weight="${item.weight}">+</button>
            </div>
          </div>
          <div class="cart-line">
            <strong>${currency(lineTotal)}</strong>
            <button aria-label="Remove ${product.name}" data-cart-remove="${product.id}" data-weight="${item.weight}">Remove</button>
          </div>
        </article>`;
    }).join("");
  }

  const total = cartTotals();
  document.getElementById("cartSubtotal").textContent = currency(total);
  document.getElementById("cartTotal").textContent = currency(total);

  const cartButton = document.getElementById("openCart");
  if (cartButton) {
    cartButton.setAttribute("data-tooltip", count ? `Total: ${currency(total)}` : "Cart is empty");
  }
}

function generateWhatsAppOrder(customerName) {
  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }
  const lines = [`Hello ${STORE_CONFIG.name},`, "", `Name : ${customerName}`, "", "I would like to order", ""];
  cart.forEach((item, index) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return;
    lines.push(`${index + 1}.`, product.name, `Weight : ${item.weight}`, `Quantity : ${item.quantity}`, `Price : ${currency(selectedPrice(product, item.weight) * item.quantity)}`, "");
  });
  lines.push("--------------------------------", "Grand Total", currency(cartTotals()), "", "Please confirm my order.");
  window.open(`${STORE_CONFIG.whatsappBase}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
}