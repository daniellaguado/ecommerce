// Mostrar y ocultar carrito
const productsList = document.querySelector('.products__container');
const cartToggle = document.querySelector('.cart__toggle');
const cartBlock = document.querySelector('.cart__block');
const carList = document.querySelector('#cart__list');

cartToggle.addEventListener('click', () => {
  cartBlock.classList.toggle("nav__cart__visible")
  
});
// Pintar con click
cartToggle.addEventListener('click', ()=> {
  cartToggle.classList.toggle("cart__fill")
});

// Bloque carrito de compras
// const car = document.querySelector('#cart');
const cartProducts = [];

//! Funcion que contenga y ejecute todos los listeners al inicio de la carga del codigo
eventListenersLoader()
function eventListenersLoader(){
  //Cuando se presione el boton "Add to cart"
  productsList.addEventListener('click', addProductToList)
}




//*Agregar productos al carrito

//Capturar la info del producto que se de click
function addProductToList(e){
 if(e.target.classList.contains('add__to__cart')){
  const product = e.target.parentElement.parentElement
  console.log(product);
 }
}

//Transformar la informacion html a un array de objetos


//Debo validar si el elemento seleccionado ya se encuentra dentro del carrito
//Si existe le debo sumar una unidad para que no se repita, 

//Mostrar los productos



















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


// Dibujar productos en la web

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




