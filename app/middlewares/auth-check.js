module.exports = function (req, res, next) {
    if (req.user) {
        return next();
    }
    if(req.isApi){
        return res.status(401).json({error:'Unauthorized'});
    }
    res.redirect('/signin');
}
