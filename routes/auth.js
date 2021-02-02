const express = require('express');
const {
    createController
} = require('../utils/factory');
const guest = require('../app/middlewares/guest');
const register = require('../app/middlewares/auth/register');
const authenticate = require('../app/middlewares/auth/authenticate');
const logout = require('../app/middlewares/auth/logout'); 
const authCheck = require('../app/middlewares/auth-check');
const {
    rules
} = require('../validators/userValidator');
const useMessages = require('../app/middlewares/useMessages');
authValidator = require('../validators/auth-validator');
const validate = require('../validators/validate');
const verifyEmail = require('../app/middlewares/auth/verifyEmail');

const router = express.Router();
router.use(express.urlencoded({
    extended: true
}));

let AuthController = createController('AuthController');
router.use(useMessages);
router.get('/signup', guest, AuthController.register.bind(AuthController));
router.get('/signin', guest, AuthController.login.bind(AuthController));
router.get('/verify', verifyEmail((req, res, message) => {
        res.json(message);
    },
    (req, res, error) => {
        res.json(error);
    }));
router.post('/signup', guest, rules(), validate, register('/home'));
router.post('/signin', guest, authValidator.rules(), validate, authenticate('/home'));
router.post('/logout', authCheck, logout());

module.exports = router;