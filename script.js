let cart = [];
let total = 0;

const ARBtn = document.querySelectorAll('.addRemoveBtn');
const aler = document.querySelector(".alertcircle");
const alert1 = document.querySelector(".alertcircle1");
const form = document.querySelector(".bookform");
const bookBtn = document.querySelector('#btn');
const emailInput = document.querySelector('.half[type="email"]');
const nameInput = document.querySelector(".fullname");
const phoneInput = document.querySelector('input[type="tel"]');

function addItem(name, price) {
    aler.classList.add("hidden");
    alert1.classList.add("hidden");
    cart.push({ name: name, price: price });
    total += Number(price);
    renderCart();
}
function removeItem(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) {
        total -= cart[index].price;
        cart.splice(index, 1);
    }
    if (cart.length <= 0) {
        alert1.classList.remove("hidden");
        aler.classList.remove("hidden");
    }
    renderCart();
}

ARBtn.forEach(btn => {
    btn.addEventListener('click', (data) => {
        const serviceDiv = data.target.closest('.service');
        const name = serviceDiv.querySelector('.serviceName').innerText;
        const price = parseInt(serviceDiv.querySelector('.servicePrice').innerText);

        if (!btn.classList.contains("removeAddBtn")) {
            btn.innerHTML = `Remove Item <ion-icon name="remove-circle-outline"></ion-icon>`;
            btn.classList.add("removeAddBtn");
            addItem(name, price);
        } else {
            btn.innerHTML = `Add Item <ion-icon name="add-circle-outline"></ion-icon>`;
            btn.classList.remove("removeAddBtn");
            removeItem(name);
        }
    });
});

function renderCart() {
    let cartTotal = document.querySelector(".totalDisplay");
    let cartTable = document.querySelector("#cart");
    let srNo = 0;
    cartTable.innerHTML = '';

    cart.forEach((item) => {
        srNo++;
        cartTable.innerHTML += `
        <tr>
            <td>${srNo}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
        </tr>`;
    });
    cartTotal.innerHTML = `${total}`;
}

bookBtn.addEventListener('click', (data) => {
    data.preventDefault();

    if (cart.length <= 0) {
        alert("Please add at least one item to your cart.");
        return;
    }

    const emailValue = emailInput.value;
    if (!validateEmail(emailValue)) {
        alert("Please enter a valid email address.");
        return;
    }
    const itemsSummary = cart.map(item => `${item.name} (₹${item.price})`).join(", ");
    

    const params = {
        name: nameInput.value,  
        email: emailValue,
        items: itemsSummary,
        total_price: `${total}`,
        phone: phoneInput.value
    };
    emailjs.send('service_u5bl52j', 'template_0kakkzg', params)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert("Booking Successful! Check your email.");
            form.reset();
            cart = [];
            total = 0;
            
            document.querySelectorAll('.addRemoveBtn, .removeAddBtn').forEach(btn => {
                btn.innerHTML = `Add Item <ion-icon name="add-circle-outline"></ion-icon>`;
                btn.className = "addRemoveBtn";
            });

            renderCart();
            aler.classList.remove("hidden");
            alert1.classList.remove("hidden");

        }, (error) => {
            console.error('FAILED...', error);
            alert("Failed to send booking. Error: " + JSON.stringify(error));
        });
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
const newsForm = document.querySelector(".form");
newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Subscribed!");
    newsForm.reset();
});