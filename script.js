const prodName = document.getElementById("prodName");
const prodPrice = document.getElementById("prodPrice");
const prodQuantity = document.getElementById("prodQuantity");
const saveBtn = document.getElementById("saveBtn");
const message = document.getElementById("message");
const prodCount = document.getElementById("prodCount");
const prodList = document.getElementById("prodList");

let products = [];
let editIndex = null;

let savedProds = localStorage.getItem("products");

if (savedProds != null){
    products = JSON.parse(savedProds);
}

function saveprods() {
    localStorage.setItem("products", JSON.stringify(products));
}

function displayProds() {
    prodList.innerHTML = "";

    products.forEach(function (product, index) {
        prodList.innerHTML += `
            <div class="prod-card">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <button type="button" onclick="editProd(${index})">Edit</button>
                <button type="button" onclick="dltProd(${index})">Delete</button>
            </div>
        `;
    });

    prodCount.textContent = "Total Products: "+products.length;
}

saveBtn.addEventListener("click", function() {
    let product = {
        name: prodName.value,
        price: prodPrice.value,
        quantity: prodQuantity.value
    }
    if (editIndex === null){
        products.push(product);
        message.textContent = "Added Product: "+product.name+".";
    } else {
        products[editIndex] = product;
        editIndex = null;
        saveBtn.textContent = "Save Product";
        message.textContent = "Product Edited successfully";
    }

    saveprods();
    displayProds();

    prodName.value = "";
    prodPrice.value = "";
    prodQuantity.value = "";
});

function editProd(Index){
    prodName.value = products[Index].name;
    prodPrice.value = products[Index].price;
    prodQuantity.value = products[Index].quantity;

    editIndex = Index;

    saveBtn.textContent = "Update Product";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

function dltProd(Index){
    products.splice(Index, 1);

    saveprods();
    displayProds();
    message.textContent = "Product Deleted Successfully.";
}

displayProds();