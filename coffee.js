let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}


let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}


let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}



let cartItems = [];
let cartTotal = 0;

function addToCart(name, price, image) {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');

    const itemImage = document.createElement('img');
    itemImage.src = image;
    itemImage.alt = name;

    const itemDetails = document.createElement('div');
    itemDetails.classList.add('cart-item-details');

    const itemName = document.createElement('h3');
    itemName.classList.add('cart-item-name');
    itemName.textContent = name;

    const itemPrice = document.createElement('p');
    itemPrice.classList.add('price');
    itemPrice.textContent = price;

    const removeButton = document.createElement('span');
    removeButton.classList.add('remove-item');
    removeButton.innerHTML = '&times;';
    removeButton.onclick = () => removeFromCart(name);

    itemDetails.appendChild(itemName);
    itemDetails.appendChild(itemPrice);

    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemDetails);
    cartItem.appendChild(removeButton);

    cartItems.push({ name: name, price: price, image: image });
    cartTotal += parseFloat(price.replace('$', ''));

    cartItemsElement.appendChild(cartItem);

    updateCartItemCount();
    updateCartTotal(cartTotalElement);
}

function removeFromCart(name) {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const index = cartItems.findIndex(item => item.name === name);
    if (index !== -1) {
        const removedItem = cartItems.splice(index, 1)[0];
        cartTotal -= parseFloat(removedItem.price.replace('$', ''));
        cartItemsElement.removeChild(cartItemsElement.childNodes[index]);

        updateCartItemCount();
        updateCartTotal(cartTotalElement);
    }
}

function updateCartTotal(cartTotalElement) {
    cartTotalElement.textContent = 'Общая сумма: $' + cartTotal.toFixed(2);
}

function updateCartItemCount() {
    const cartItemCountElement = document.getElementById('cart-item-count');
    cartItemCountElement.textContent = cartItems.length;
}