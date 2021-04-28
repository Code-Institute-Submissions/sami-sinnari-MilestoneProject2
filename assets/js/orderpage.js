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

  getButtons() {
    let buttons = [...document.querySelectorAll(".addToCart")];
    buttonDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id === parseInt(id, 10));

      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }

      button.addEventListener("click", e => {
        e.preventDefault();
        e.target.innerHTML = "In Cart";
        e.target.disabled = true;

        const cartItem = { ...Storage.getProduct(id), amount: 1 };

        // this will add product to the cart 
        cart = [...cart, cartItem];

        // This will save the cart
        Storage.saveCart(cart);

        this.setItemValues(cart);
        this.addCartItem(cartItem);

      });
    });
  }

  setItemValues(cart) {
    let tempTotal = 0;
    let itemTotal = 0;

    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    itemTotals.innerText = itemTotal;
  }

  addCartItem({ image, price, title, id }) {
    const div = document.createElement("div");
    div.classList.add("cart__item");

    div.innerHTML = `<img src=${image}>
          <div>
            <h3>${title}</h3>
            <h3 class="price">$${price}</h3>
          </div>
          <div>
            <span class="increase" data-id=${id}>
            <i class="fas fa-sort-up"></i>
            </span>
            <p class="item__amount">1</p>
            <span class="decrease" data-id=${id}>
            <i class="fas fa-sort-down"></i>
            </span>
          </div>

            <span class="remove__item" data-id=${id}>
            <i class="fas fa-trash"></i>
            </span>
        </div>`;
        
    cartContent.appendChild(div);
  }


  show() {
    cartDOM.classList.add("show");
    overlay.classList.add("show");
  }

  hide() {
    cartDOM.classList.remove("show");
    overlay.classList.remove("show");
  }

  setAPP() {
    cart = Storage.getCart();
    this.setItemValues(cart);
    this.populate(cart);

    openCart.addEventListener("click", this.show);
    closeCart.addEventListener("click", this.hide);
  }

  populate(cart) {
    cart.forEach(item => this.addCartItem(item));
  }


  
}