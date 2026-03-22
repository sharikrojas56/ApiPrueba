document.addEventListener("DOMContentLoaded", () => {
    getAllProducts();
});

// GET ALL 
async function getAllProducts() {
    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();

    const container = document.getElementById("container");
    container.innerHTML = "";

    products.forEach(product => {
        loadCard(product);
    });
}

//  LOAD CARD
function loadCard(product){

    const container = document.getElementById("container");

    const card = document.createElement("div");
    card.classList.add("card-product");

    card.innerHTML = `
        <img src="${product.thumbnail || 'https://via.placeholder.com/150'}">

        <h3>${product.title}</h3>
        <p>$${product.price}</p>

        <div class="card-buttons">
            <button class="btn btn-danger btn-sm"
                onclick="deleteByIdProduct(${product.id})">
                Delete
            </button>

            <button class="btn btn-primary btn-sm"
                onclick="loadProductUpdate(${product.id},'${product.title}',${product.price})">
                Update
            </button>
        </div>
    `;

    container.appendChild(card);
}

// ================= DELETE =================
async function deleteByIdProduct(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`,{
        method: "DELETE"
    });

    if (response.ok) {
        alert("Producto eliminado");
        getAllProducts();
    }
}

// ================= FIND =================
async function getFindByIdProduct() {

    const idFilter = document.getElementById("idFilter").value;

    if (idFilter === "") return getAllProducts();

    const response = await fetch(`http://localhost:3000/products/${idFilter}`);

    const container = document.getElementById("container");
    container.innerHTML = "";

    if (!response.ok) return;

    const product = await response.json();
    loadCard(product);
}

// ================= LOAD UPDATE =================
function loadProductUpdate(id,title,price,thumbnail){

    document.getElementById("idUpdate").value = id;
    document.getElementById("title").value = title;
    document.getElementById("price").value = price;

    document.getElementById("update").style.display = "block";
    document.getElementById("addProduct").style.display = "none";

    document.querySelector(".header").style.display = "none";
    document.getElementById("container").style.display = "none";
}   

// ================= UPDATE =================
async function updateProduct(){

    const id = document.getElementById("idUpdate").value;
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const file = document.getElementById("image").files[0];

    let imageBase64 = null;

    if(file){
        imageBase64 = await toBase64(file);
    }

    const response = await fetch(`http://localhost:3000/products/${id}`,{
        method: "PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            title: title,
            price: Number(price),
            ...(imageBase64 && { thumbnail: imageBase64 })
        })
    });

    if(!response.ok){
        alert("Error al actualizar");
        return;
    }

    alert("Producto actualizado");
    showTable();
    getAllProducts();
}

// ================= ADD =================
async function addProduct(){

    const title = document.getElementById("titleAdd").value;
    const price = document.getElementById("priceAdd").value;
    const file = document.getElementById("imageAdd").files[0];

    if(title === "" || price === ""){
        alert("Completa los campos");
        return;
    }

     if(!file){
    alert("Debes subir una imagen");
    return;
    }

    let imageBase64 = "";

    if(file){
        imageBase64 = await toBase64(file);
    }

    const response = await fetch("http://localhost:3000/products",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            title: title,
            price: Number(price),
            thumbnail: imageBase64
        })
    });

    if(!response.ok){
        alert("Error al agregar");
        return;
    }

   

    alert("Producto agregado");

    document.getElementById("titleAdd").value = "";
    document.getElementById("priceAdd").value = "";
    document.getElementById("imageAdd").value = "";

    showTable();
    getAllProducts();
}

// ================= BASE64 =================
function toBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// ================= UI =================
function showAddProduct(){
    document.getElementById("addProduct").style.display = "block";
    document.getElementById("update").style.display = "none";

    document.querySelector(".header").style.display = "none";
    document.getElementById("container").style.display = "none";
}

function showTable(){
    document.getElementById("addProduct").style.display = "none";
    document.getElementById("update").style.display = "none";

    document.querySelector(".header").style.display = "block";
    document.getElementById("container").style.display = "grid";
}