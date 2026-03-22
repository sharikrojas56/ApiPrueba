import ProductService from "../services/ProductService.js";

export default class ProductViewModel {

    static async getProducts() {
        return await ProductService.getAll();
    }

    static async deleteProduct(id) {
        return await ProductService.delete(id);
    }

    static async findProduct(id) {
        return await ProductService.getById(id);
    }

    static async createProduct(data) {
        if (!data.title || !data.price) {
            throw new Error("Campos vacíos");
        }
        return await ProductService.create(data);
    }

    static async updateProduct(id, data) {
        return await ProductService.update(id, data);
    }

    // 🔥 BASE64
    static toBase64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}