const UserRepository = require('../../repositories/UserRepository');
const userRepo = new UserRepository();

module.exports = function register(successRedirect = "/", errorRedirect = 'back') {
    return async function (req, res, next) {
        try {
            let user = await userRepo.findOrCreate(req.body);
            // 4 hours
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