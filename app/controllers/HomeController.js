const sequelize = require('../sequelize');

class HomeController {

    index(req, res) {
        res.render('index', req, res);
    }

    async home(req, res) {
        let user = await sequelize.models.User.create({
            firstName: "Adam",
            lastName: "James",
            email: "James@mail.com",
            password: "james",
            email_confirmed: false,
        });
        console.log(user);
        let post = await user.createPost({
            title: "some title",
            body: "some body",
        });
        console.log(post);
        res.renderWithMessages('home');
    }

}

module.exports = HomeController;