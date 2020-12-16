const express = require('express');
const {
    createController
} = require('../utils/factory');
const guest = require('../app/middlewares/guest');
const register = require('../app/middlewares/auth/register');
const authenticate = require('../app/middlewares/auth/authenticate');
const {
    rules
} = require('../validators/userValidator');
const validate = require('../validators/validate');

const router = express.Router();
router.use(express.urlencoded({
    extended: true
}));

let AuthController = createController('AuthController');

router.get('/signup', guest, AuthController.register.bind(AuthController));
router.get('/signin', guest, AuthController.login.bind(AuthController));

router.post('/signup', guest, rules(), validate, register('/home'));
router.post('/signin', guest, authenticate('/home'));
// router.post('/logout', AuthController.logout.bind(AuthController));
module.exports = router;