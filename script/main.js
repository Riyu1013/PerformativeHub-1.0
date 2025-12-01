// CURSOR
  const cursor = document.getElementById("cursor")
  const footer = document.getElementById("footer")
  footer.addEventListener("mousemove", (e) => {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
    cursor.style.display = "block";
    document.body.style.cursor="none";
  });
  footer.addEventListener("mouseleave", (e) => {
    document.body.style.cursor="default";
  })
    // PROGRAM TO POPULATE CART
  function populateCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  
  // Clear current content
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty</p>';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item", "d-flex", "mb-3", "align-items-center");

    div.innerHTML = `
      <div class="product-img me-3">
        <img src="${item.image}" alt="${item.title}" style="width:10vw; height:100%; object-fit:cover;">
      </div>
      <div class="product-desc flex-grow-1">
        <strong>${item.title}</strong><br>
        <span>Quantity: ${item.quantity}</span>
      </div>
      <button class="btn btn-sm btn-danger remove-item">×</button>
    `;

    // Remove item button
    div.querySelector(".remove-item").addEventListener("click", () => {
      const index = cart.findIndex(ci => ci.title === item.title);
      if (index >= 0) cart.splice(index, 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      populateCart(); // Refresh the offcanvas
    });

    cartContainer.appendChild(div);
  });
}

// Call this whenever the cart offcanvas is shown
const offcanvasEl = document.getElementById('offcanvasRight');
offcanvasEl.addEventListener('show.bs.offcanvas', populateCart);


// ========== Purchase Popup ========== //
var purchaseQuantity = 1;
const MIN_PURCHASE_QUANTITY = 1;
const MAX_PURCHASE_QUANTITY = 10;
const PURCHASE_QUANTITY_ID = "purchase-quantity";
const DECREASE_BUTTON_ID = "decrease-button";
const INCREASE_BUTTON_ID = "increase-button";


function getPurchaseQuantity() {
    return document.getElementById(PURCHASE_QUANTITY_ID).innerHTML;
}

function setPurchaseQuantity(value) {
    document.getElementById(PURCHASE_QUANTITY_ID).innerHTML = value;
}

function updatePurchaseQuantityBy(value) {
    let purchaseQuantity = parseInt(getPurchaseQuantity());
    purchaseQuantity += value;
    // Clamp the purchase amount
    purchaseQuantity = Math.min(Math.max(purchaseQuantity, MIN_PURCHASE_QUANTITY), MAX_PURCHASE_QUANTITY);
    setPurchaseQuantity(purchaseQuantity);
}

function resetPurchaseQuantity() {
  setPurchaseQuantity(MIN_PURCHASE_QUANTITY);
}

function onClickHandler(value) {
    updatePurchaseQuantityBy(value);
}

function attachPurchaseControlButtonHandlers() {
  document.getElementById(DECREASE_BUTTON_ID).addEventListener("click", (e) => {onClickHandler(-1)});
  document.getElementById(INCREASE_BUTTON_ID).addEventListener("click", (e) => {onClickHandler(1)});
}


// ========== ADD TO CART ========== //
const ADD_TO_CART_BUTTON = "add-to-cart-btn";

function addToCart(product) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Check if already in cart by title (or id)
  const existingIndex = cart.findIndex(item => item.title === product.title);
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }

  // Save back to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
}