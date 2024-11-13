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

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1,
        }];
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1,
        });
    } else {
        carts[positionThisProductInCart].quantity += 1; 
    }
    addCartToHTML();
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.dataset.id = cart.product_id;
            newCart.innerHTML = `
            <div class="item grid grid-cols-[70px_150px_50px_1fr] gap-[10px] text-center items-center">
                <div class="image">
                    <img src="/${info.img}" alt="" class="w-full">
                </div>
                <div class="name">
                    ${info.title}
                </div>
                <div class="totalPrice">$${info.price * cart.quantity}</div>
                <div class="quantity">
                    <span class="minus inline-block w-[20px] h-[25px] bg-white text-black border rounded-full cursor-pointer">&lt;</span>
                    <span class="">${cart.quantity}</span>
                    <span class="plus inline-block w-[20px] h-[25px] bg-white text-black border rounded-full cursor-pointer">></span>
                </div>
                </div>
            `;
            listCartHTML.appendChild(newCart);
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    let product_id = positionClick.closest('.item').dataset.id;

    if (positionClick.classList.contains('minus')) {
        let productInCart = carts.find((cart) => cart.product_id == product_id);
        if (productInCart && productInCart.quantity > 1) {
            productInCart.quantity -= 1;
            addCartToHTML();
        }
    }

    if (positionClick.classList.contains('plus')) {
        let productInCart = carts.find((cart) => cart.product_id == product_id);
        if (productInCart) {
            productInCart.quantity += 1;
            addCartToHTML();
        }
    }
});

const initApp = () => {
    fetch('/assets/js/data.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            console.log(listProducts); 
            addDataToHTML();
        })
        .catch(error => console.error('Error fetching data:', error));
};

initApp();

function updateCounter(){
    let list = document.getElementById("list");
    let getCards = list.getElementsByClassName("item");
    
}