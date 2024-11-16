



import { addToPanie, addToFavi } from "../assets/js/models/functions";

const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const category = document.getElementById("category");
const img = document.getElementById("product-image");
const panieBtn = document.getElementById("panie-btn");
const heartBtn = document.getElementById("heart-btn");

const notfound = document.getElementById("not-found");
const page = document.getElementById("product-detail");
const suggestion = document.getElementById("suggestions");

const cartIcon = document.getElementById("card-btn");
const closeCartBtn = document.querySelector(".close");
const cartList = document.querySelector(".ListCart");
const cartTotal = document.querySelector(".cartTotal");
const cartItemCount = document.querySelector(".icon-cart span");

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartItemCount();
updateCartDisplay();




// Overlay creation
const overlay = document.createElement("div");
overlay.id = "overlay";
overlay.className = "fixed inset-0 bg-black bg-opacity-50 hidden z-[999]";
document.body.appendChild(overlay);

// Open cart and show overlay
cartIcon.addEventListener("click", () => {
  document.body.classList.toggle("showCart");
  document.querySelector(".cartTab").style.right = document.body.classList.contains("showCart") ? "0" : "-400px";
  overlay.classList.toggle("hidden", !document.body.classList.contains("showCart"));
  console.log("Cart icon clicked; toggle cart visibility and overlay");
});

// Close cart when clicking close button or overlay
closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

function closeCart() {
  document.body.classList.remove("showCart");
  document.querySelector(".cartTab").style.right = "-400px";
  overlay.classList.add("hidden");
  console.log("Cart modal closed.");
}

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (productId === null) {
  showNotFoundPage();
  console.log("Error: No product ID provided.");
} else {
  const url = `http://localhost:3000/products/${productId}`;

  fetch(url)
    .then((res) => res.json())
    .then((product) => {
      uploadProduct(product);
      handleSuggestion(product.category);
    })
    .catch((e) => {
      console.log("Error fetching product data:", e);
      showNotFoundPage();
    });
}

function uploadProduct(product) {
  document.getElementById("loading").classList.add("hidden");
  title.textContent = product.title;
  price.textContent = `$${product.price}`;
  description.textContent = product.description;
  category.textContent = product.category;
  img.src = `../${product.img}`;

  panieBtn.addEventListener("click", () => addToCart(product));
  heartBtn.addEventListener("click", () => addToFavi(product.id));
}

function showNotFoundPage() {
  notfound.classList.add("flex");
  notfound.classList.remove("hidden");
  page.classList.add("hidden");
}

function handleSuggestion(category) {
  fetch(`http://localhost:3000/products?category=${category}&_limit=3`)
    .then((res) => res.json())
    .then(showSuggestion)
    .catch((e) => console.log("Error fetching suggestions:", e));
}

function showSuggestion(products) {
  const content = products
    .map((product) => {
      return `
      <div class="w-64 h-48 flex flex-col items-center transition-transform transform hover:scale-110 duration-300">
        <a href="/pages/detail.html?id=${product.id}">
          <img src="../${product.img}" class="shadow-lg rounded-2xl w-fit h-72" />
          <p class="text-slate-400">${product.category}</p>
          <h1 class="font-semibold">${product.title}</h1>
          <h2 class="text-yellow-500">$${product.price}</h2>
        </a>
        <hr>
      </div>
    `;
    })
    .join("");
  suggestion.innerHTML = content;
}

function addToCart(product) {
  const existingCartItem = cart.find(item => item.id === product.id);

  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartItemCount();
  updateCartDisplay();
}

function updateCartItemCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartItemCount.textContent = totalItems > 0 ? totalItems : '';
}

function updateCartDisplay() {
  cartList.innerHTML = ''; 

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item", "grid", "grid-cols-[70px_150px_50px_1fr]", "gap-[10px]", "text-center", "items-center", "border-bold");
    cartItem.setAttribute("data-id", item.id);
    cartItem.innerHTML = `
      <div class="image">
        <img src="../${item.img}" alt="${item.title}" class="w-full">
      </div>
      <div class="name text-black">${item.title}</div>
      <div class="totalPrice">$${item.price}</div>
      <div class="quantity flex flex-row">
        <span class="minus inline-block w-[20px] h-[20px] bg-white text-black border rounded-full cursor-pointer">-</span>
        <span class="count">${item.quantity}</span>
        <span class="plus inline-block w-[20px] h-[20px] bg-white text-black border rounded-full cursor-pointer">+</span>
      </div>
      
    `;
    cartList.appendChild(cartItem);

    cartItem.querySelector(".plus").addEventListener("click", () => updateQuantity(cartItem, 1, item.price));
    cartItem.querySelector(".minus").addEventListener("click", () => updateQuantity(cartItem, -1, item.price));
  });

  updateCartTotal();
}

function updateQuantity(cartItem, change, productPrice) {
  const quantityElem = cartItem.querySelector(".quantity .count");
  let quantity = parseInt(quantityElem.textContent) + change;

  if (quantity < 1) {
    const cartItemId = cartItem.getAttribute("data-id");
    cart = cart.filter(item => item.id != cartItemId);
    localStorage.setItem('cart', JSON.stringify(cart));

    cartItem.remove();
    updateCartItemCount();
    updateCartTotal();
  } else {
    quantityElem.textContent = quantity;
    cartItem.querySelector(".totalPrice").textContent = `$${(productPrice * quantity).toFixed(2)}`;

    const cartItemId = cartItem.getAttribute("data-id");
    const cartItemIndex = cart.findIndex(item => item.id == cartItemId);
    cart[cartItemIndex].quantity = quantity;

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItemCount();
    updateCartTotal();
  }
}

function updateCartTotal() {
  const cartItems = cartList.querySelectorAll(".cart-item");
  let total = 0;
  cartItems.forEach((item) => {
    const price = parseFloat(item.querySelector(".totalPrice").textContent.replace("$", ""));
    total += price;
  });
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
