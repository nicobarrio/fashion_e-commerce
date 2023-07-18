document.addEventListener("DOMContentLoaded", () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);

    const productosCarrito = document.getElementById("productos-carrito");
    const subtotalElement = document.querySelector(".subtotal-price p:last-child");
    const totalElement = document.querySelector(".total-price p:last-child");

    fetchProducts(cart).then((products) => {
      const html = generateHTML(products);
      productosCarrito.innerHTML = html;
      const subtotal = calculateSubtotal(products);
      subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
      totalElement.textContent = `$${subtotal.toFixed(2)}`;

      // Agregar evento de escucha a los botones de eliminar
      const eliminarBotones = document.querySelectorAll(".eliminar-producto");
      eliminarBotones.forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.dataset.productId;
          eliminarProducto(productId);
        });
      });

      // Agregar eventos de escucha para los botones de sumar y restar cantidad
      const decreaseButtons = document.querySelectorAll(".decrease-quantity");
      const increaseButtons = document.querySelectorAll(".increase-quantity");
      console.log(decreaseButtons);
      decreaseButtons.forEach((button) => {
        button.addEventListener("click", () => {
          console.log("hiciste click");
          const productId = button.dataset.productId;
          console.log(productId);
          updateQuantity(productId, -1); // Restar 1 a la cantidad
          const quantityElement = document.querySelector(
            `#quantity-${productId}`
          );
          const newQuantity = parseInt(quantityElement.textContent) - 1;
          updateQuantityInUI(productId, newQuantity, subtotalElement);
        });
      });

      increaseButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.dataset.productId;
          updateQuantity(productId, 1); // Sumar 1 a la cantidad
          const quantityElement = document.querySelector(
            `#quantity-${productId}`
          );
          const newQuantity = parseInt(quantityElement.textContent) + 1;
          updateQuantityInUI(productId, newQuantity, subtotalElement);
        });
      });

    });
  }
});

function fetchProducts(cart) {
  const promises = cart.map((item) => {
    return fetch(`/api/products/${item.id}`)
      .then((response) => response.json())
      .then(({ product }) => {
        product.cartItemId = item.id; // Agregar una propiedad para identificar el elemento del carrito
        return product;
      });
  });
  return Promise.all(promises);
}

function generateHTML(products) {
  return products
    .map(
      (product) => `
     
    <div class="product-details">
        <img src="${product.image}" alt="" width="75">
        <i class="fas fa-circle"></i>
        <p class="product-title">${product.name}</p>
        <p class="product-price">$${product.price}</p>
        
        <div class="quantity-container">
            <button class="decrease-quantity" data-product-id="${
              product.id
            }">-</button>
            <span id="quantity-${product.id}" class="quantity">${
        product.quantity ?? 1
      }</span>

            <button class="increase-quantity" data-product-id="${
              product.id
            }">+</button>
        </div>

        <button class="eliminar-producto" data-product-id="${
          product.id
        }">Eliminar</button>
    </div>
    `
    )
    .join("");
}

function calculateSubtotal(products) {
  return products.reduce((subtotal, product) => subtotal + product.price, 0);
}

function eliminarProducto(productId) {
  let cart = localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);
    const updatedCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    location.reload(); // Recargar la página para actualizar el carrito
  }
}

function updateQuantityInUI(productId, newQuantity, subtotalElement) {
  const quantityElement = document.querySelector(`#quantity-${productId}`);
  if (quantityElement) {
    quantityElement.textContent = newQuantity;

    const priceElement = quantityElement.parentNode.previousElementSibling; // Elemento que contiene el precio
    const productPrice = parseFloat(priceElement.textContent.replace("$", ""));
    const newProductTotal = productPrice * newQuantity;
    priceElement.textContent = `$${newProductTotal.toFixed(2)}`;

    const products = Array.from(
      quantityElement.parentNode.parentNode.getElementsByClassName(
        "product-details"
      )
    );
    updateSubtotal(subtotalElement, products);
    updateTotal(totalElement, products);
  }
}
const subtotalElement = document.querySelector(".subtotal-price p:last-child");
const totalElement = document.querySelector(".total-price p:last-child");

function updateSubtotal(subtotalElement, products) {
    const subtotal = calculateSubtotal(products);
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }
  
  function updateTotal(totalElement, products) {
    const subtotal = calculateSubtotal(products);
    totalElement.textContent = `$${subtotal.toFixed(2)}`;
  }
  