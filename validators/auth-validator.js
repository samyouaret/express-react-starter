const {
    body
} = require('express-validator');

module.exports = {
    rules() {
        return [
            // username must be an email
            body('email').isEmail()
            .normalizeEmail()
            .withMessage('email cannot be empty').
            notEmpty(),
            body('password')
            .notEmpty()
            .withMessage('password cannot be empty'),
        ]
    }
}