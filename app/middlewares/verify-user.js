module.exports = function (req, res, next) {
    if (req.user && req.user.email_confirmed) {
        return next();
    }
    res.redirect('back');
}