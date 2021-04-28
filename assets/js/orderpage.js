let productDOM = document.querySelector(".product__center");

let cartDOM = document.querySelector(".cart");

let cartContent = document.querySelector(".cart__content");

let openCart = document.querySelector(".cart__icon");

let closeCart = document.querySelector(".close__cart");

let overlay = document.querySelector(".cart__overlay");

let cartTotal = document.querySelector(".cart__total");

let clearCartBtn = document.querySelector(".clear__cart");

let itemTotals = document.querySelector(".item__total");

let cart = [];

let buttonDOM = [];




class UI {
  displayProducts(products) {
    let results = "";
    products.forEach(({ title, specs1, specs2, specs3, price, image, id }) => {
      //Div class "product" was firstly created in orderpage.html file, then inserted here.
      results += ` 
      <div class="product">
        <div class="image__container">
          <img src=${image} alt="" />
        </div>
        <div class="product__footer">
          <h1>${title}</h1>
          <p>${specs1}</p>
          <p>${specs2}</p>
          <p>${specs3}</p>
          <div class="bottom">       
          </div>
          <div class="price">$${price}</div>
          <button class="btn addToCart" data-id= ${id} >Add to Cart</button>
          
        </div>
      </div>`;
    });

    productDOM.innerHTML = results;
  }

