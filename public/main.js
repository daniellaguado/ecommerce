// Mostrar y ocultar carrito
const totalProductsBackground = document.querySelector('.total__products');
const productsList = document.querySelector('.products__container');
const modalContainer = document.querySelector('#modal-container');
const totalProducts = document.querySelector('.total__products');
const cartToggle = document.querySelector('.cart__toggle');
const deleteProductCart = document.querySelector('#cart');
const cartBlock = document.querySelector('.cart__block');
const modalBody = document.querySelector('.modal__body');
const emptyCar = document.querySelector('#empty__cart');
const carList = document.querySelector('#cart__list');


let cartProducts = [];
let modalProducts = [];

cartToggle.addEventListener('click', () => {
  cartBlock.classList.toggle("nav__cart__visible")
  
});
// Pintar con click
cartToggle.addEventListener('click', ()=> {
  cartToggle.classList.toggle("cart__fill")
});

// Bloque carrito de compras
// const car = document.querySelector('#cart');


//! Funcion que contenga y ejecute todos los listeners al inicio de la carga del codigo
eventListenersLoader()
function eventListenersLoader(){
  //!Add to cart
  productsList.addEventListener('click', addProductToList);
  //!Delete to cart
  deleteProductCart.addEventListener('click', deleteProduct);
  //!Delete all produtos cart
  emptyCar.addEventListener('click', emptyCartFn)
  //!Da un ok cuando todo el DOM termina de cargar por pimera vez 
  document.addEventListener('DOMContentLoaded', ()=>{ 
    cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    cartElementHTML();
  })
  //!Ejecutar modal
  productsList.addEventListener('click', modalProduct);
  //!Close Modal
  modalContainer.addEventListener('click', closeModal )
}



const baseUrl = "https://ecommercebackend.fundamentos-29.repl.co/";
// -- Get products ----------------------------------------------------
function getProducts() {
  axios.get(baseUrl)
    .then(function (response){
      const products = response.data
      printProducts(products)
      
    })
    .catch(function(error){
      console.log(error)
    })
}
getProducts()

// Productos main
function printProducts(products){
  let html = '';
  
products.forEach(product => {
  html += `
  <div class='product__container'>
    <div class='product__container__img'>
      <img src="${product.image}" alt="Imagen del producto">
    </div>
    <p class="product__container__name">
      ${product.name}
    </p>
    <div class="product__container__price">
      <p>$ ${product.price.toFixed(2)}</p>
    </div>
    <div class="product__container__button">
      <button class="car__button add__to__cart" id="add__to__cart" data-id="${product.id}">Agregar al carrito</button>
      <button class="product__details">Ver detalles</button>
    </div>
  </div>
  `
})
  productsList.innerHTML = html
}



//*Agregar productos al carrito
//Capturar la info del producto que se de click
function addProductToList(e){
 if(e.target.classList.contains('add__to__cart')){
  const product = e.target.parentElement.parentElement
  cartProductsElements(product)
 }
}

//Transformar la informacion html a un array de objetos

function cartProductsElements(product){

  const infoProduct = {
    id: product.querySelector('.add__to__cart').getAttribute('data-id'),
    image: product.querySelector('img').src,
    name: product.querySelector('p').textContent,
    price: product.querySelector('.product__container__price p').textContent,
    quantity: 1
  }

//valida si existe algun elemento dentro del array que cumpla la condicion
//Debo validar si el elemento seleccionado ya se encuentra dentro del carrito
//Si existe le debo sumar una unidad para que no se repita, 
  
if (cartProducts.some(e => e.id === infoProduct.id)) {
    const product = cartProducts.map(e => {
      if (e.id === infoProduct.id) {
        e.quantity++;
        return e;
      }else{
        return e;
      }
    }) 
    cartProducts = [...product]
    
  }else{
    cartProducts = [...cartProducts, infoProduct]

  }
  totalProductsCart(cartProducts)
  cartElementHTML(cartProducts)
}


// Burbuja total productos del carrito
function  totalProductsCart(cartProducts){
  totalProducts.innerHTML = '';
  let counter = 0;
  
  counter == 0 ? totalProductsBackground.classList.add("total__products__background") : null
  
  cartProducts.forEach(e=>{
   let result = counter+=e.quantity;
    cartProducts.innerHTML = `${counter}`;
    totalProducts.innerHTML = counter
    
  })
  
}


//Productos carrito
function cartElementHTML(){
  
  carList.innerHTML = '';
  cartProducts.forEach(e => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="card__product">

        <div class="card__product__image">
          <img src="${e.image}" alt="">
        </div>

        <div class="product__description">
          <p>${e.name}</p>
          <p>${e.price}</p>
          <p>Cantidad:${e.quantity}</p>
        </div>
        
        <div class="cart_product__button">
       
          <button class="delete__product" data-id="${e.id}">
          x
          </button>
        </div>
      
        </div>
        <hr>
    `;
    carList.appendChild(div)
  })
  productLocalStorage()
}

//Borrar productos del carrito -> event ('click', deleteProduct)
function deleteProduct(e){

  if (e.target.classList.contains('delete__product')) {
    const productId = e.target.getAttribute('data-id')
    cartProducts = cartProducts.filter(e => e.id !== productId)
      totalProductsCart(cartProducts)
      cartElementHTML()
      
  }
}

//* Vaciar el carrito completo
function emptyCartFn() {
  cartProducts = [];
  cartElementHTML();
  totalProductsCart(cartProducts);
}



// Modal------------=========================================

//Abrir Modal
function modalProduct(e){
  if (e.target.classList.contains('product__details')) {
    modalContainer.classList.add('show__modal')
    const product = e.target.parentElement.parentElement
    console.log(product);
    modalProductsElements(product)
    
  }}
  function modalProductsElements(product){
    const infoModalDetails = [{
      id: product.querySelector('.add__to__cart').getAttribute('data-id'),
      image: product.querySelector('img').src,
      name: product.querySelector('p').textContent,
      price: product.querySelector('.product__container__price p').textContent,
    }
  ]
  modalProducts = [...infoModalDetails]
  modalElementHTML(modalProducts)
}





function modalElementHTML(modalProducts){
  
  modalBody.innerHTML = '';
  modalProducts.forEach(e => {
    const divModal = document.createElement('div');
    divModal.innerHTML = `
      <div class="modal__product">
        <div class="modal__product__image">
          <img src="${e.image}" alt="">
        </div>

        <div class="modal__product__description">
          <p>${e.name}</p>
          <p>${e.price}</p>
        </div>
        <button class="modal__button">x</button>
        </div>
    `;
    modalBody.appendChild(divModal)
  })
}














//Cerrar Modal
function closeModal(e){
  if (e.target.classList.contains('modal__button')) {
    modalContainer.classList.remove('show__modal')
    modalBody.innerHTML= '';
    // modalDetails = []
  }}


// LocalStorage
function productLocalStorage(){
  localStorage.setItem('cart', JSON.stringify(cartProducts))
}


