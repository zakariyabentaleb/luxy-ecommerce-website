{
  /* <a href="/product-detail.html?id=1">Product 1</a> */
}

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

//  ----------------------

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
let product;

if (productId === null) {
  notfound.classList.add("flex");
  notfound.classList.remove("hidden");
  page.classList.add("hidden");
  console.log("error id");
} else {
  const url = `http://localhost:3000/products/${productId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      product = data;
      uploadProduct(product);
    })
    .catch((e) => {
      notfound.classList.add("flex");
      notfound.classList.remove("hidden");
      page.classList.add("hidden");
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

function addToPanie(id) {
  let panie = localStorage.getItem("panie");
  
  if (panie) {
    panie = JSON.parse(panie);
  } else {
    panie = [];
  }

  if (!panie.includes(id)) {
    panie.push(id);
    localStorage.setItem("panie", JSON.stringify(panie));
} else {
    console.log("Product already in cart");
  }

}
function addToFavi(id) {
  let favi = localStorage.getItem("favi");
  
  if (favi) {
     favi = JSON.parse(favi);
  } else {
     favi = [];
  }

  if (!favi.includes(id)) {
     favi.push(id);
    localStorage.setItem("favi", JSON.stringify(favi));
} else {
    console.log("Product already in favi");
  }

}


