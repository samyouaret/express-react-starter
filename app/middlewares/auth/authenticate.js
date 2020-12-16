const UserRepository = require('../../repositories/UserRepository');
const userRepo = new UserRepository();

module.exports = function authenticate(successRedirect = "/", errorRedirect = 'back') {
    return async function (req, res, next) {
        let user = await userRepo.authenticate(req.body.email, req.body.password);
        // 4 hours
        try {
            let user = await userRepo.authenticate(req.body.email, req.body.password);
            // 4 hours
            console.log(user);
            req.session.cookie.maxAge = 3600000 * 4;
            req.session.user = user;
            res.redirect(successRedirect);
        } catch (error) {
            console.log(error);
            if (req.isApi) {
                return req.status(401).json(error);
            } else {
                req.flash(error);
                res.redirect(errorRedirect);
            }
        }
    }
}