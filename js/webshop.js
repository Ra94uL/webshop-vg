const element = document.getElementById("products");
let products=[];

if (element){

  fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    products = data.products;
    for (let product of data.products) {
      let card = `
  <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
<div class="card h-100">
  <img src="${product.thumbnail}" class="card-img-top">

  <div class="card-body d-flex flex-column">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.price} kr</p>

    <button class="btn btn-primary mt-auto add-to-cart" data-id="${product.id}">
    Add to cart
    </button>
  </div>
</div>
`;

      element.innerHTML += card;
    }
  })
 .catch(error => {
    console.error("Error:", error);
    element.innerHTML = "<p>Could not load product</p>";
  });


}

document.addEventListener("click", function(e) {

    if (e.target.classList.contains("add-to-cart")) {

        let id = Number(e.target.dataset.id);

        let cart =JSON.parse(localStorage.getItem("cart")) || [];

        let product = products.find(p => p.id == id);
        
        let existingProduct = cart.find(item => item.id == product.id);

        if (existingProduct){
          existingProduct.quantity += 1;
        }else{
          cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1
          })
        }

        localStorage.setItem("cart", JSON.stringify(cart))
        console.log(cart)

    }

});


  
  
 
