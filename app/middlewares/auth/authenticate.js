const UserRepository = require('../../repositories/UserRepository');
const userRepo = new UserRepository();
const VerifyEmailRepository = require('../../repositories/VerifyEmailRepository');
const VerifyEmailRepo = new VerifyEmailRepository();

module.exports = function authenticate(successRedirect = "/", errorRedirect = 'back') {
    return async function (req, res, next) {
        try {
            let user = await userRepo.authenticate(req.body.email, req.body.password);
            // 4 hours
            req.session.regenerate((err) => {
                if (err) throw err;
                req.session.cookie.maxAge = 3600000 * 4;
                req.session.user = user;
                req.isAuthenticated = true;
                res.redirect(successRedirect);
            });
        } catch (error) {
            if (req.isApi) {
                return req.status(401).json(error);
            } else {
                req.flash(error);
                res.redirect(errorRedirect);
            }
        }
    }
}