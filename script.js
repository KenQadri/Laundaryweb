let cart = [];
let total = 0;
let bookingS = document.querySelector('.bookingService').innerHTML;
let addedItems = document.querySelector('.addedItems').innerHTML;
let ARBtn = document.querySelectorAll('.addRemoveBtn');
let aler = document.querySelector(".alertcircle");
let alert1 = document.querySelector(".alertcircle1");
let form = document.querySelector(".bookform");
let inputname = document.querySelector("fullname");
const bookBtn = document.querySelector('#btn');
const emailInput = document.querySelector('.half[type="email"]');
let ourService = document.querySelector('.book').innerHTML;


function addItem(name,price){
            aler.classList.add("hidden");
            alert1.classList.add("hidden");
            cart.push({ name: name, price: price });
            total += Number(price);
            renderCart();
        }
function removeItem(name){
            const index = cart.findIndex(item => item.name === name);
            total -= cart[index].price;
            if(index > -1){
              cart.splice(index, 1);
            }
            if(cart.length <= 0){
            alert1.classList.remove("hidden");
        aler.classList.remove("hidden");
        }
            renderCart();
        }

ARBtn.forEach(ARBtn =>{
    ARBtn.addEventListener('click',(data) => {
        const serviceDiv = data.target.closest('.service');
        const name = serviceDiv.querySelector('.serviceName').innerText;
        const price = parseInt(serviceDiv.querySelector('.servicePrice').innerText);
        

     if(data.target.className =="addRemoveBtn"){
        ARBtn.innerHTML = `Remove Item
        <ion-icon name="remove-circle-outline"></ion-icon>`;
        ARBtn.classList.add("removeAddBtn");
        addItem(name , price);
        console.log(data);
        
    }
    else{
        ARBtn.innerHTML = `Add Item
        <ion-icon name="add-circle-outline"></ion-icon>`;
        ARBtn.classList.add("addRemoveBtn");
        ARBtn.classList.remove("removeAddBtn");
        removeItem(name);
         
     }
    })
})

function renderCart(){
    console.log(cart);
    let cartTotal = document.querySelector(".totalDisplay");
    let cartTable = document.querySelector("#cart");
    let srNo = 0;
    cartTable.innerHTML = '';

    cart.forEach((item) => {
        
        srNo++;
        console.log(srNo);
        cartTable.innerHTML += `
        <tr>
            <td>${srNo}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
        </tr>
        `;
    })
      cartTotal.innerHTML = `\u20B9${total}`;
}


bookBtn.addEventListener('click', (data) => {
    if(cart.length <= 0){
        alert("add item first");
    } else {
        const emailValue = emailInput.value;
        
        if (!validateEmail(emailValue)) {
            data.preventDefault();
            alert("Please enter a valid email address.");
        } else {
            data.preventDefault();
            alert("Thank you For Booking the Service. We will get back to you soon!");
            form.reset();
            cart = [];
            total = 0;
            const allButtons = document.querySelectorAll('.addRemoveBtn, .removeAddBtn');
            allButtons.forEach(btn => {
                btn.innerHTML = `Add Item <ion-icon name="add-circle-outline"></ion-icon>`;
                btn.className = "addRemoveBtn";
            });
            renderCart();
            aler.classList.remove("hidden");
            alert1.classList.remove("hidden");
        }
    }
});


function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


const newsForm = document.querySelector(".form");
const newsFormreset = document.querySelector(".form").innerHTML;
newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Subscribed");
    document.querySelector(".form").innerHTML = newsFormreset;
});