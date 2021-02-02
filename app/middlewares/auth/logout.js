module.exports = function logout(redirectTo = "/") {
    return function (req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            console.log(" =========== session destroyed =========== ");
            res.redirect(redirectTo)
        });
    }
}