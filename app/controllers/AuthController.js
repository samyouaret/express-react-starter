const UserRepository = require('../repositories/UserRepository');

class AuthController {
    constructor() {
        this.repository = new UserRepository();
    }

    login(req, res) {
        res.renderWithMessages('login');
    }

    register(req, res) {
        res.renderWithMessages('register');
    }

    logout(req, res) {

    }
}

module.exports = AuthController;