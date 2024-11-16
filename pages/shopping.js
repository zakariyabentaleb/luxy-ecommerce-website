const shoppingCartItems = document.getElementById("shopping-cart-items");
const shoppingCartTotal = document.getElementById("shopping-cart-total");

let cart = JSON.parse(localStorage.getItem('cart')) || [];


function loadShoppingCart() {
  shoppingCartItems.innerHTML = ''; 
  let total = 0;

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item", "grid", "grid-rows-1", "grid-cols-[113px_repeat(4,1fr)]", "text-center", "items-center","mt-6");
    cartItem.setAttribute("data-id", item.id);
    cartItem.innerHTML = `
      <div class="image">
        <img src="../${item.img}" alt="${item.title}" class="w-full">
      </div>
      <div class="name">${item.title}</div>
      <div class="totalPrice">$${(item.price * item.quantity).toFixed(2)}</div>
      <div class="quantity">
        <span class="minus inline-block w-[20px] h-[25px] bg-white text-black border rounded-full cursor-pointer">-</span>
        <span class="count">${item.quantity}</span>
        <span class="plus inline-block w-[20px] h-[25px] bg-white text-black border rounded-full cursor-pointer">+</span>
      </div>
      <button class="remove hover:bg-red-600 hover:border-red-600 hover:text-white border-2 border-black text-black py-2 px-4 font-bold rounded transition-all">
  Remove
</button>
    `;
    shoppingCartItems.appendChild(cartItem);

    total += item.price * item.quantity;

   
    cartItem.querySelector(".plus").addEventListener("click", () => updateQuantity(cartItem, 1, item.price));
    cartItem.querySelector(".minus").addEventListener("click", () => updateQuantity(cartItem, -1, item.price));
    cartItem.querySelector(".remove").addEventListener("click", () => removeCartItem(cartItem));
  });

 
  shoppingCartTotal.textContent = `$${total.toFixed(2)}`;
}


function updateQuantity(cartItem, change, productPrice) {
  const quantityElem = cartItem.querySelector(".quantity .count");
  let quantity = parseInt(quantityElem.textContent) + change;

  if (quantity < 1) {
    removeCartItem(cartItem);
  } else {
    quantityElem.textContent = quantity;

    
    const totalPriceElem = cartItem.querySelector(".totalPrice");
    totalPriceElem.textContent = `$${(productPrice * quantity).toFixed(2)}`;

    const cartItemId = cartItem.getAttribute("data-id");
    const cartItemIndex = cart.findIndex(item => item.id === cartItemId);
    cart[cartItemIndex].quantity = quantity;

    localStorage.setItem('cart', JSON.stringify(cart));
    loadShoppingCart();
  }
}


function removeCartItem(cartItem) {
  const cartItemId = cartItem.getAttribute("data-id");
  cart = cart.filter(item => item.id !== cartItemId);

  localStorage.setItem('cart', JSON.stringify(cart));
  loadShoppingCart();
}


window.addEventListener("DOMContentLoaded", loadShoppingCart);
