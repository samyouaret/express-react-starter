const sequelize = require('../sequelize');

class HomeController {

    index(req, res) {
        res.render('index');
    }

    async home(req, res) {
        res.renderWithMessages('home');
    }

}

module.exports = HomeController;