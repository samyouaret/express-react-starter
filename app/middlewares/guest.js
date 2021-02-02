module.exports = function (req, res, next) {
    if (req.session.user) {
        console.log('cannot access user is authenticated .....');
        console.log(req.session);
        if (req.isApi) {
            return res.status(422).send('Unauthorized');
        }
        return res.redirect('back');
    }
    next();
}
