let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let ironCartSpan = document.querySelector('.icon-cart span');


let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
    console.log('Icon clicked');
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="/${product.img}" alt="" class="w-[90%] ">
                <div class="flex flex-col">
                    <h2>${product.title}</h2>
                    <h2>${product.rating}</h2>
                </div>
                <p>${product.description}</p>
                <div class="price text-sm tracking-custom">$${product.price}</div>
                <button class="addCart bg-black text-white px-2 py-1 rounded-[20px] mt-5 border-0 cursor-pointer">
                    Add To Cart
                </button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
};
listProductHTML.addEventListener('click', (event) =>{
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {

}



const initApp = () => {
    fetch('/assets/js/data.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            console.log(listProducts); // Check the loaded data
            addDataToHTML();
        })
        .catch(error => console.error('Error fetching data:', error)); // Error handling
};

initApp();
