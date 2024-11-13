{
  /* <a href="/product-detail.html?id=1">Product 1</a> */
}

import {addToPanie,addToFavi} from "../assets/js/models/functions"
  
  // DOM Variables:

const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const category = document.getElementById("category");
const img = document.getElementById("product-image");
const panieBtn = document.getElementById("panie-btn");
const heartBtn = document.getElementById("heart-btn");

const notfound = document.getElementById("not-found");
const page = document.getElementById("product-detail");
const suggestion = document.getElementById("suggestions")
//  ----------------------

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (productId === null) {
  showNotFoundPage()
  console.log("error id");
} else {
  const url = `http://localhost:3000/products/${productId}`;

  fetch(url)
    .then((res) => res.json())
    .then((product) => {
      // -------------------
      uploadProduct(product);
      handleSuggestion(product.category)
    })
    .catch((e) => {
      console.log(e);
      
      showNotFoundPage()

    });
}

function uploadProduct(product) {
  document.getElementById("loading").classList.add("hidden");
  title.textContent = product.title;
  price.textContent = product.price;
  description.textContent = product.description;
  category.textContent = product.category;
  img.src = `../${product.img}`;

  panieBtn.addEventListener("click", () => {
    addToPanie(product.id);
  });
  heartBtn.addEventListener("click",()=>{
     addToFavi(product.id);

  })
}




function showNotFoundPage(){
  notfound.classList.add("flex");
  notfound.classList.remove("hidden");
  page.classList.add("hidden");
}


function handleSuggestion(category){

console.log(category);

  fetch(`http://localhost:3000/products?category=${category}&_limit=3`)
  .then( res => res.json())
  .then(showSuggestion)
  .catch(e => {
    console.log(e)
  })
  // suggestion.innerHTML
}


function showSuggestion(products){
      
  console.log(products);
  
  let content =  products.map( product => {
    return `

    <a j>
      <div class="w-64 h-48 flex flex-col items-center transition-transform transform hover:scale-110 duration-300">
        <img
          src="../${product.img}"
          alt="${product.title}"
          class="shadow-lg rounded-2xl"
        />
        <p class="text-slate-400">Categorie</p>
        <h1 class="font-semibold">${product.title}</h1>
        <h2 class="text-yellow-500">${product.price}</h2>
        <img
          src="../assets/icons/heart.svg"
          alt="Like Icon"
          class="lg:-mt-[125%] p-2 lg:ml-[80%] bg-white w-7 rounded-full -mt-56 ml-24"
        />
      </div></a>

  `
  })
  console.log(content);
  
      suggestion.innerHTML =content

}