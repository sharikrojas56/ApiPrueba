import UserViewModel from "../viewmodels/UserViewModel.js";

const container = document.getElementById("container");

// ================= LOAD =================
export async function loadUsers() {
    const users = await UserViewModel.getUsers();

    container.innerHTML = "";
    users.forEach(loadCard);
}

// ================= CARD =================
function loadCard(user){

    const card = document.createElement("div");
    card.classList.add("card-product");

    card.innerHTML = `
        <img src="${user.image}">
        <h3>${user.firstName} ${user.lastName}</h3>
        <p>${user.email}</p>

        <div class="card-buttons">
            <button onclick="window.deleteUser(${user.id})">
                Delete
            </button>
        </div>
    `;

    container.appendChild(card);
}

// ================= DELETE =================
window.deleteUser = async (id) => {
    const res = await UserViewModel.deleteUser(id);

    if(res.ok){
        alert("Usuario eliminado");
        loadUsers();
    }
};

// ================= FIND =================
window.findUser = async () => {

    const id = document.getElementById("idFilter").value;

    if(id === "") return loadUsers();

    const user = await UserViewModel.findUser(id);

    container.innerHTML = "";

    if(user){
        loadCard(user);
    }
};