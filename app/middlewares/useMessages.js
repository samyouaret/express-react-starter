module.exports = function useMessage(req, res, next) {
    req.messages = {};
    if (req.session.flash) {
        req.messages.errors = req.flash('error');
        req.messages.success = req.flash('success');
    }
    res.renderWithMessages = (file, data = null) => {
        const csrfToken = req.csrfToken ? req.csrfToken() : '';
        let messages = req.messages;
        res.render(file, {
            csrfToken,
            messages,
            ...data,
            user: req.session.user
        });
    }
    next();
}