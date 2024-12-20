// fetch('http://localhost:3000/29')
//             .then(res=>res.json())
//             .then(json=> console.log(json));
// `<img src="${json.img}">`
// Loop through each product ID from 0 to 7
// for (let i = 0; i < "30"; i++) {
//     let url = `http://localhost:3000/${i}`; // Construct the URL using template literals

//     fetch(url)
//         .then(res => res.json())
//         .then(json => {
//             console.log(json);

//             // Create a new HTML element to display the product
//             document.getElementById("products").innerHTML+= `
//                 <div class="w-10">
//                 <img src="${json.img}" alt="Product Image" style="width: 200px; height: auto;">
//                 <h3>${json.title}</h3>
//                 <p>Price: $${json.price}</p>
//                 <p>${json.description}</p>
//                 <p>Rating: ${json.rating} ⭐</p>
//                 <p>Rating: ${json.ca} ⭐</p>
//                 </div>
//             `;

// Append the product to an existing element in the HTML

//    })
//    .catch(error => console.error("Error fetching data:", error));
// }
// fetch('http://localhost:3000/9')
//     .then(res => res.json())
//     .then(json => {
//         // Make sure there is an element with the ID "products" in your HTML
//         const productsContainer = document.getElementById("products");
//         if (productsContainer) {
//             productsContainer.innerHTML = `<img src="${json.img}" alt="Product Image">`;
//         } else {
//             console.error("Element with ID 'products' not found in the DOM.");
//         }
//     })

const userNameSpan = document.getElementById("username-span");
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  userNameSpan.textContent = user.username;
}
// DOM Variables for nav
const leftLinks = document.querySelector("#left-links");
const cards = document.querySelector("#cards");
const menu = document.querySelector("#menu");
const cartBtn = document.querySelector("#card-btn");

// events for nav
cartBtn.addEventListener("click", () => {
  cards.classList.toggle("w-0");
  cards.classList.toggle("w-3/4");
});
menu.addEventListener("click", () => {
  leftLinks.classList.toggle("left-[-800px]");
  leftLinks.classList.toggle("left-[12.5%]");
});
