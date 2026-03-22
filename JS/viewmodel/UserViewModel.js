import UserService from "../services/UserService.js";

export default class UserViewModel {

    static async getUsers() {
        return await UserService.getAll();
    }

    static async findUser(id) {
        return await UserService.getById(id);
    }

    static async deleteUser(id) {
        return await UserService.delete(id);
    }
}