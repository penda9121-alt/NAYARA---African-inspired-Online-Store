/* Student ID: 24635752
Name: Mariam Diop
File Name: cart.js
Description: Assignment about Index Database API
*/

function addToCart(name, price, image, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    quantity = Number(quantity) || 1;

    let existingItem = cart.find(function(item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            image: image,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added " + quantity + " x " + name + " to your cart!");
}

function addToCartWithQty(name, price, image, qtyInputId) {
    let qtyInput = document.getElementById(qtyInputId);
    let quantity = 1;

    if (qtyInput) {
        quantity = Number(qtyInput.value) || 1;
    }

    addToCart(name, price, image, quantity);
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
        cartTotal.textContent = "Total: $0.00";
        return;
    }

    let total = 0;

    cart.forEach(function(item, index) {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Subtotal: $${subtotal.toFixed(2)}</p>

                    <button onclick="decreaseQuantity(${index})">-</button>
                    <button onclick="increaseQuantity(${index})">+</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = "Total: $" + total.toFixed(2);
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

document.addEventListener("DOMContentLoaded", displayCart);