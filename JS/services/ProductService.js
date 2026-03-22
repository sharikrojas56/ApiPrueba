
const URL = "http://localhost:3000/products";

export default class ProductService {

    // GET ALL
    static async getAll() {
        const response = await fetch(URL);
        return await response.json();
    }

    // GET BY ID
    static async getById(id) {
        const response = await fetch(`${URL}/${id}`);
        if (!response.ok) return null;
        return await response.json();
    }

    // CREATE
    static async create(data) {
        return await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    // UPDATE
    static async update(id, data) {
        return await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    // DELETE
    static async delete(id) {
        return await fetch(`${URL}/${id}`, {
            method: "DELETE"
        });
    }
}