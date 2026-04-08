const orderElement = document.getElementById("product");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {

    let product = data.products.find(p => p.id == id);

    if (!product){
      orderElement.innerHTML = "<p>product not found</p>"
      return;
    }

    let card = `
      <div class="card mx-auto" style="max-width: 400px;">
        <img src="${product.thumbnail}" class="card-img-top" style="height: 400px; object-fit: cover;">

        <div class="card-body d-flex flex-column">
          <h2 class="card-title">${product.title}</h2>
          <p class="card-text">${product.price} kr</p>
        </div>
      </div>
    `;

    orderElement.innerHTML = card;

    

  })
  .catch(error => {
    console.error("Error:", error);
    orderElement.innerHTML = "<p>Could not load product</p>";
  });
  

  const form = document.getElementById("orderForm");
  form.addEventListener("submit", function(event){
    

    let name =document.getElementById("f-name").value.trim();
    let phone = document.getElementById("f-phone").value.trim();
    let pattern = /^[0-9\-()]+$/;
    let email = document.getElementById("f-email").value.trim();
    let street = document.getElementById("f-street").value.trim();
    let zipcode = document.getElementById("f-zipcode").value.trim();
    let zipcodePattern = /^[0-9]{5}$/;
    let city = document.getElementById("f-city").value.trim();

    if (name.length  < 2 || name.length  > 50){
        alert("names must be at least 2 letters and no more than 50");
        return;
    }

    if (phone.length > 20) {
        alert("Phone number max 20 characters");
        event.preventDefault();
        return;
    }

    if (!pattern.test(phone)) {
        alert("Phone can only contain numbers, - and ()");
        event.preventDefault();
        return;
    }


    if (email.length > 50) {
    alert("Email must not be more than 50 characters");
    event.preventDefault();
    return;
    }
    if(!email.includes("@")){
        alert("Email must contain @");
        event.preventDefault();
        return;
    }


    if (!zipcodePattern.test(zipcode)){
        alert("Postcode must be exactly 5 digits (e.g., 12345)")
        event.preventDefault();
        return;
    }

    if (street.length < 2 || street.length > 50){
      alert ("Address must be between 2 and 50 characters");
      event.preventDefault();
      return;
    }

    if (city.length < 2 || city.length > 20) {
    alert("City must be between 2 and 20 characters");
    event.preventDefault();
    return;
  }





    
  });
   
  
 
