module.exports = function (req, res, next) {
    if (req.session.user && req.session.user.email_confirmed) {
        return next();
    }
    res.redirect('back');
}