const express = require('express');
const { createController } = require('../utils/factory');
const { resources, auth } = require('../utils/Router');
const useMessages = require('../app/middlewares/useMessages');

let router = express.Router();
let homeController = createController('HomeController');

router.get('/home',useMessages, homeController.home.bind(homeController));
router.get('/', homeController.index.bind(homeController));

module.exports = router;