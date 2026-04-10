let cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);

const container = document.getElementById("cart-items");

let total = 0;
for (let item of cart){
    
    container.innerHTML += ` 
        <div class="card mb-3 p-3">
            <h5>${item.title}</h5>
            <p>Price: ${item.price} kr </p>

            <div>
                <button class="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>
            
            <button class="btn btn-danger remove-item" data-id="${item.id}">
                Remove
            </button>


        </div>  
    `;
    
    total += item.price * item.quantity;
    
}

document.getElementById("total").innerText = "Total: " + total + " kr";

document.addEventListener("click", function(e){
    if (e.target.classList.contains("remove-item")) {

        let id = Number(e.target.dataset.id);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        cart = cart.filter(item => item.id !== id);

        localStorage.setItem("cart", JSON.stringify(cart));
        
        location.reload()
    }
});

document.getElementById("clear-cart").addEventListener("click", function(){

    localStorage.removeItem("cart");

    location.reload();
})


document.addEventListener("click", function(e){

    let increaseBtn = e.target.closest(".increase");
    let decreaseBtn = e.target.closest(".decrease");

    if (increaseBtn) {
        let id = Number(increaseBtn.dataset.id);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let product = cart.find(item => item.id === id);

        product.quantity += 1;

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();
    }

    if (decreaseBtn) {
        let id = Number(decreaseBtn.dataset.id);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let product = cart.find(item => item.id === id);

        product.quantity -= 1;

        
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();
    }

});

document.getElementById("confirm-order").addEventListener("click", function(){

    
    localStorage.removeItem("cart");

    
    window.location.href =  "top-navigation/thankyou.html";
});


