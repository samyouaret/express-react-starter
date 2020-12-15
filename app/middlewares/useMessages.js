module.exports = function useMessage(req, res, next) {
    req.messages = {};
    if (req.session.flash) {
        req.messages.errors = req.flash('error');
        message.messages.success = req.flash('success');
    }
    res.renderWithMessages = (file, data = null) => {
        const csrfToken = req.csrfToken ? req.csrfToken() : '';
        let messages = req.messages;
        let isAuthenticated = false;
        let user = req.user;
        res.render(file, {
            csrfToken,
            messages,
            isAuthenticated,
            ...data
        });
    }
    next();
}