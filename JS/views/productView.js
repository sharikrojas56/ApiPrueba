import ProductViewModel from "../viewmodels/ProductViewModel.js";

const container = document.getElementById("container");

// ================= LOAD =================
export async function loadProducts() {
    const products = await ProductViewModel.getProducts();

    container.innerHTML = "";
    products.forEach(loadCard);
}

// ================= CARD =================
function loadCard(product){

    const card = document.createElement("div");
    card.classList.add("card-product");

    card.innerHTML = `
        <img src="${product.thumbnail || 'https://via.placeholder.com/150'}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>

        <div class="card-buttons">
            <button onclick="window.deleteProduct(${product.id})">Delete</button>

            <button onclick="window.loadUpdate(${product.id},'${product.title}',${product.price})">
                Update
            </button>
        </div>
    `;

    container.appendChild(card);
}

// ================= DELETE =================
window.deleteProduct = async (id) => {
    const res = await ProductViewModel.deleteProduct(id);

    if(res.ok){
        alert("Producto eliminado");
        loadProducts();
    }
};

// ================= FIND =================
window.findProduct = async () => {

    const id = document.getElementById("idFilter").value;

    if(id === "") return loadProducts();

    const product = await ProductViewModel.findProduct(id);

    container.innerHTML = "";

    if(product){
        loadCard(product);
    }
};

// ================= LOAD UPDATE =================
window.loadUpdate = (id,title,price) => {

    document.getElementById("idUpdate").value = id;
    document.getElementById("title").value = title;
    document.getElementById("price").value = price;

    showUpdate();
};

// ================= UPDATE =================
window.updateProduct = async () => {

    const id = document.getElementById("idUpdate").value;
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const file = document.getElementById("image").files[0];

    let imageBase64 = null;

    if(file){
        imageBase64 = await ProductViewModel.toBase64(file);
    }

    const res = await ProductViewModel.updateProduct(id,{
        title,
        price: Number(price),
        ...(imageBase64 && { thumbnail: imageBase64 })
    });

    if(!res.ok){
        alert("Error");
        return;
    }

    alert("Actualizado");
    showTable();
    loadProducts();
};

// ================= ADD =================
window.addProduct = async () => {

    const title = document.getElementById("titleAdd").value;
    const price = document.getElementById("priceAdd").value;
    const file = document.getElementById("imageAdd").files[0];

    if(title === "" || price === ""){
        alert("Completa los campos");
        return;
    }

    if(!file){
        alert("Sube imagen");
        return;
    }

    const imageBase64 = await ProductViewModel.toBase64(file);

    const res = await ProductViewModel.createProduct({
        title,
        price: Number(price),
        thumbnail: imageBase64
    });

    if(!res.ok){
        alert("Error");
        return;
    }

    alert("Producto agregado");

    showTable();
    loadProducts();
};

// ================= UI =================
window.showAddProduct = () => {
    document.getElementById("addProduct").style.display = "block";
    document.getElementById("update").style.display = "none";

    document.querySelector(".header").style.display = "none";
    container.style.display = "none";
};

window.showUpdate = () => {
    document.getElementById("update").style.display = "block";
    document.getElementById("addProduct").style.display = "none";

    document.querySelector(".header").style.display = "none";
    container.style.display = "none";
};

window.showTable = () => {
    document.getElementById("addProduct").style.display = "none";
    document.getElementById("update").style.display = "none";

    document.querySelector(".header").style.display = "block";
    container.style.display = "grid";
};