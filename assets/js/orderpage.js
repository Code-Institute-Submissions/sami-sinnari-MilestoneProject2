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
    products.forEach(({ title, specs1, specs2, specs3, price, image, id })=>{
      //div class "product" was firstly created in orderpage.html file, then inserted here.

      results += ` 
      <div class="product">
        <div>
          <img src=${image} alt="Image of a PC"/>
        </div>
        <div class="product__footer">
          <h1>${title}</h1>
          <p class="spec-p">${specs1}</p>
          <p class="spec-p">${specs2}</p>
          <p class="spec-p">${specs3}</p>
          <div class="bottom">       
          </div>
          <div class="price">$${price}</div>
          <button class="btn addToCart" data-id= ${id} >Add to Cart</button>
        </div>
      </div>`;
    });

    productDOM.innerHTML = results;
  }

  

  orderButtons() {
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

        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        // this will add product to the cart 
        cart = [...cart, cartItem];


        // this will save the cart

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

    let div = document.createElement("div");
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

  cartLogic() {

    clearCartBtn.addEventListener("click", () => {
      
      this.clearCart();
      this.hide();
    });


    cartContent.addEventListener("click", e => {
      let target = e.target.closest("span");
      let targetElement = target.classList.contains("remove__item");
      if (!target) return;

      if (targetElement) {
        let id = parseInt(target.dataset.id);
        this.removeItem(id);
        cartContent.removeChild(target.parentElement);
      } 
      
      else if (target.classList.contains("increase")) {
        let id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount++;
        Storage.saveCart(cart);
        this.setItemValues(cart);
        target.nextElementSibling.innerText = tempItem.amount;
      } 
      
      else if (target.classList.contains("decrease")) {
        let id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount--;

        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setItemValues(cart);
          target.previousElementSibling.innerText = tempItem.amount;
        } 
        
       else {
          this.removeItem(id);
          cartContent.removeChild(target.parentElement.parentElement);
        }
      }
    });
  }

  clearCart() {

    let cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));

    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }

  removeItem(id) {

    cart = cart.filter(item => item.id !== id);
    this.setItemValues(cart);
    Storage.saveCart(cart);


    let button = this.singleButton(id);
    button.disabled = false;
    button.innerText = "Add to Cart";
  }

  singleButton(id) {
    return buttonDOM.find(button => parseInt(button.dataset.id) === id);
  }
}


class Products {
  async getProducts() {

    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}

class Storage {
  //made serialization below to convert
  static saveProduct(obj) {
    localStorage.setItem("products", JSON.stringify(obj));
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getProduct(id) {
    // deserialization with parse
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.id === parseFloat(id, 10));
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let productList = new Products();
  let ui = new UI();
  ui.setAPP();

  let products = await productList.getProducts();
  ui.displayProducts(products);
  Storage.saveProduct(products);
  ui.orderButtons();
  ui.cartLogic();
});