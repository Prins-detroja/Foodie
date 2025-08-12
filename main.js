
var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
});



const cartIcon = document.querySelector('.cart-icon');
const cart = document.querySelector('.cart-tab');
const closeCart = document.querySelector('.close-cart');
const cardlist = document.querySelector('.card-list');
const cartlist = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartCount = document.querySelector('.cart-val');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-manu');

cartIcon.addEventListener('click', () => {
  cart.classList.add('cart-tab-active');
});

closeCart.addEventListener('click', () => {
  cart.classList.remove('cart-tab-active');
});

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('mobile-manu-active');
});




// cards



let productlist = [];
let cartProduct = [];

const updateTotal = () => {

  let totalPrice = 0;
  let totalQuantity = 0;


  document.querySelectorAll(".item").forEach(item => {
    const quantity = parseInt(item.querySelector('.quntitu-value').textContent);
    const price = parseFloat(item.querySelector('.item-total').textContent.replace('₹ ', ''));

    totalPrice += price;

    totalQuantity += quantity;
  });

  cartTotal.textContent = `₹ ${totalPrice.toFixed(2)}`;

  cartCount.textContent = totalQuantity;




}



const showCards = () => {
  productlist.forEach((product) => {
    const OrderCard = document.createElement('div');
    OrderCard.classList.add('order-card');

    OrderCard.innerHTML = `
              <div class="card-img ">
                  <img src="${product.image}" alt="${product.name}">
              </div>
              <h4>${product.name}</h4>
              <h4 class="price">&#8377; ${product.price}</h4>
              <a href="#" class="mobile-btn cardbtn" >Add to Cart</a>
            `;

    cardlist.appendChild(OrderCard);

    const cardbtn = OrderCard.querySelector('.cardbtn');
    cardbtn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(product);
    })
  });

};

const addToCart = (product) => {

  let quantity = 1;
  let price = parseFloat(product.price);

  // Check if product is already in cart
  const existingProduct = cartProduct.find(item => item.id === product.id);

  if (existingProduct) {
    alert(`${product.name} is already in the cart`);
    return;
  }

  // Add product to cart
  cartProduct.push(product);

  const cartItem = document.createElement('div');
  cartItem.classList.add('item');

  cartItem.innerHTML = `
           <div class="image-container">
                <img src="${product.image}" alt="burger">
            </div>
            <div>
                <h4>${product.name}</h4>
                <h4 class="item-total">&#8377; ${product.price}</h4>
            </div>
            <div class="flex">
                <a href="" class="quantity-btn"><i class="fa-solid fa-plus"></i></a>
                <h4 class="quntitu-value">1</h4>
                <a href="" class="quantity-btn"><i class="fa-solid fa-minus"></i></a>
            </div>
      `;

  cartlist.appendChild(cartItem);
  updateTotal();

  cart.classList.add('cart-tab-active');

  const plusBtn = cartItem.querySelector('.fa-plus');
  const minusBtn = cartItem.querySelector('.fa-minus');
  const quantityValue = cartItem.querySelector('.quntitu-value');
  const itemTotal = cartItem.querySelector('.item-total');
  // const cartTotal = document.querySelector('.cart-total');



  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `₹ ${(price * quantity).toFixed(2)}`;
    updateTotal();
  });

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `₹ ${(price * quantity).toFixed(2)}`;
      updateTotal();
    } else {
      cartItem.remove();
      cartProduct = cartProduct.filter(item => item.id !== product.id);
      updateTotal();
    }
  });

};

const initapp = () => {
  fetch('product.json')
    .then((res) => res.json())
    .then((data) => {
      productlist = data;

      showCards();
    });
}

initapp(); 