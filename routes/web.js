const express = require('express');
const {
    createController
} = require('../utils/factory');
const {
    resources,
    auth
} = require('../utils/Router');
const useMessages = require('../app/middlewares/useMessages');
const verifyUser = require('../app/middlewares/verify-user');

let router = express.Router();
let homeController = createController('HomeController');

router.get('/home', useMessages, verifyUser, homeController.home.bind(homeController));

router.get('/', homeController.index.bind(homeController));

module.exports = router;