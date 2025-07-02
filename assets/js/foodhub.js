'use strict';

const nav = document.querySelector('.navbar-nav');
const navLinks = document.querySelectorAll('.nav-link');
const cartToggleBtn = document.querySelector('.shopping-cart-btn');
const navToggleBtn = document.querySelector('.menu-toggle-btn');
const shoppingCart = document.querySelector('.cart-box');

const navToggleFunc = function () {
  nav.classList.toggle('active');
  navToggleBtn.classList.toggle('active');
}




const cartToggleFunc = function () { shoppingCart.classList.toggle('active') }

navToggleBtn.addEventListener('click', function () {

  if (shoppingCart.classList.contains('active')) cartToggleFunc();

  navToggleFunc();

});
function closeCart() {
  const cart = document.querySelector('.cart-box');
  cart.classList.remove('active');
}

function closeCart() {
  const cart = document.querySelector('.cart-box');
  cart.classList.remove('active');
}


cartToggleBtn.addEventListener('click', function () {
  if (nav.classList.contains('active')) navToggleFunc();

  cartToggleFunc();

});

for (let i = 0; i < navLinks.length; i++) {

  navLinks[i].addEventListener('click', navToggleFunc);

}

document.addEventListener('click', function (event) {
  const isClickInsideCart = shoppingCart.contains(event.target);
  const isClickOnCartButton = cartToggleBtn.contains(event.target);
  const isClickOnRemoveBtn = event.target.classList.contains('remove-btn');

  if (!isClickInsideCart && !isClickOnCartButton && !isClickOnRemoveBtn) {
    shoppingCart.classList.remove('active');
  }
});

const searchInput = document.getElementById('menuSearch');
const suggestionsBox = document.getElementById('searchSuggestions');

searchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const items = document.querySelectorAll('.product-card');
  suggestionsBox.innerHTML = ''; // Clear previous suggestions

  if (query.trim() === '') {
    suggestionsBox.style.display = 'none';
    return;
  }

  let hasResults = false;

  items.forEach(item => {
    const name = item.querySelector('.product-name')?.textContent;
    if (name && name.toLowerCase().includes(query)) {
      hasResults = true;
      const id = item.getAttribute('id');
      const p = document.createElement('p');
      p.textContent = name;
      p.addEventListener('click', () => {
        item.scrollIntoView({ behavior: 'smooth', block: 'start' });
        suggestionsBox.style.display = 'none';
        searchInput.value = ''; // Optional: Clear input after selecting
      });
      suggestionsBox.appendChild(p);
    }
     
  });
 if (!hasResults) {
    const noResult = document.createElement('p');
    noResult.textContent = 'No results found';
    noResult.classList.add('no-result');
    suggestionsBox.appendChild(noResult);
    suggestionsBox.style.display = 'block';
  } else {
    suggestionsBox.style.display = 'block';
  }
});





const cartList = document.getElementById("cartList");
let cartItems = [];
updateCartUI();

function addToCart(element,event) {
  if(event) event.preventDefault(); // prevent link navigation jump

  const productCard = element.closest(".product-card");

  const item = {
    id: productCard.dataset.id,
    name: productCard.dataset.name,
    price: productCard.dataset.price,
    img: productCard.dataset.img,
  };

  const alreadyInCart = cartItems.find(cartItem => cartItem.id === item.id);
  if (!alreadyInCart) {
    cartItems.push(item);
    updateCartUI();

    // Scroll smoothly to cart section or menu section (choose one)
    // Example: scroll menu section into view
    const menuSection = document.getElementById('menu');
    
  }
}

function removeFromCart(id, event) {
  if (event) event.preventDefault(); // prevent page jump
  cartItems = cartItems.filter(item => item.id !== id);
  updateCartUI();

  // Scroll cart into view after removing
  const cartBox = document.querySelector('.cart-box');
  if (cartBox) {
    cartBox.scrollIntoView({ behavior: 'smooth' });
  }
}

function updateCartUI() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = ""; // Clear existing items

  const cartBox = document.querySelector('.cart-box');
  const count = document.querySelector('.shopping-cart-btn .count');

  if (cartItems.length === 0) {
    cartBox.classList.remove('active'); // Hide cart if empty
    if (count) count.innerText = '0';
    return;
  } else {
    cartBox.classList.add('active'); // Show cart if not empty
  }

  cartItems.forEach(item => {
    const li = document.createElement("li");

    li.innerHTML = `
  <a href="#" class="cart-item" data-id="${item.id}">
    <div class="img-box">
      <img src="${item.img}" alt="${item.name}" class="product-img" width="50" height="50">
    </div>
    <h5 class="product-name">${item.name}</h5>
    <p class="product-price"><span class="small">₹</span>${item.price}</p>
    <button class="remove-btn" data-id="${item.id}" style="margin-left:auto;color:red;">✖</button>
  </a>
`;

    // Append li to cart list
    cartList.appendChild(li);

    // Scroll to product on clicking cart item (except remove button)
    li.querySelector('.cart-item').addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('remove-btn')) {
        // Ignore clicks on remove button here
        return;
      }
      const productElement = document.getElementById(`product-${item.id}`);
      if (productElement) {
        productElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Remove item from cart when clicking remove button
    li.querySelector('.remove-btn').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent the scroll on remove button click
      removeFromCart(item.id);
    });
  });

  // Update cart count
  if (count) count.innerText = cartItems.length;
}
document.querySelectorAll('.cart-item').forEach(item => {
  item.addEventListener('click', function(event) {
    // Avoid triggering when clicking the remove button inside
    if(event.target.classList.contains('remove-btn')) return;

    event.preventDefault();
    const id = this.dataset.id;
    const target = document.getElementById(`product-${id}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


  // Add event listeners to remove buttons to prevent default and handle properly
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      const id = this.dataset.id;
      removeFromCart(id);
    });
  });

  window.addEventListener("load", function () {

    cartItems = [];
    updateCartUI();

  const loader = document.getElementById("loader");

 
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transform = "translateY(-100px)";
    
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1000); 
});




