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
        <img src="${item.image}" alt="${item.title}" style="width:60px; height:auto; object-fit:cover;">
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
