const URL = "http://localhost:3000/users";

export default class UserService {

    static async getAll() {
        const res = await fetch(URL);
        const data = await res.json();
        return data.users || data; // 🔥 por si viene con "users"
    }

    static async getById(id) {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) return null;
        return await res.json();
    }

    static async delete(id) {
        return await fetch(`${URL}/${id}`, {
            method: "DELETE"
        });
    }
}