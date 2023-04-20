const cartToggle = document.querySelector('.cart__toggle');
const cartBlock = document.querySelector('.cart__block');

//* lógica para mostrar y ocultar el carrito.
cartToggle.addEventListener('click', () => {
  cartBlock.classList.toggle("nav__cart__visible")
  //* Cuando NO tiene la clase nav__car__visible, la agrega. Si se le da click nuevamente y detecta la clase, la retira.
})



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





//* Dibujar productos en la web
const productsList = document.querySelector('.products__container');



function printProducts(products){
  let html = '';
  
  for(let i = 0; i < products.length; i++){
    html += `
    <div class='product__container'>
      <div class='product__container__img'>
        <img src="${products[i].image}" alt="image">
      </div>
      <p class="product__container__name">
        ${products[i].name}
      </p>
      <div class="product__container__price">
        <p>$ ${products[i].price.toFixed(2)}</p>
      </div>
      <div class="product__container__button">
        <button class="car__button add__to__car" id="add__to__car" data-id="${products[i].id}">Agregar al carrito</button>
        <button class="product__details">Ver detalles</button>
      </div>
    </div>
    `
  }
  productsList.innerHTML = html
}




