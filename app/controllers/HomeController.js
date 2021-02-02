const sequelize = require('../sequelize');

class HomeController {

    index(req, res) {
        res.renderWithMessages('index');
    }

    async home(req, res) {
        res.renderWithMessages('home');
    }

}

module.exports = HomeController;