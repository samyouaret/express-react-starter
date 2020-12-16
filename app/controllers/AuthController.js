const UserRepository = require('../repositories/UserRepository');

class AuthController {
    constructor() {
        this.repository = new UserRepository();
    }

    login(req, res) {
        res.renderWithMessages('login', req, res);
    }

    register(req, res) {
        res.renderWithMessages('register', req, res);
    }

    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}

module.exports = AuthController;