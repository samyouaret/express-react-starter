const pathHelper = require('../utils/pathHelper');
const express = require('express');
const services = require('./services');

class Application {
    constructor() {
        this.app = express();
        this.app.disable('x-powered-by');
        global.env = pathHelper.env;
        global.config = (configFile) => {
            return require(pathHelper.config_path(configFile));
        };
        this.pathHelper = pathHelper;
    }

    getServer() {
        return this.app;
    }

    start() {
        this.init();
        this.startServer();
    }

    init() {
        let VIEWS_PATH = pathHelper.root_path(env('VIEWS_PATH')) || pathHelper.view_path();
        let STATIC_PATH = pathHelper.root_path(env('STATIC_PATH')) || pathHelper.static_path();
        this.app.set('view engine', env('VIEW_ENGINE'));
        this.app.set('views', VIEWS_PATH);
        this.app.use(express.static(STATIC_PATH));
        this.loadServices();
    }

    loadServices() {
        services.forEach(serviceFile => {
            let service = require(pathHelper.service_path(serviceFile));
            service.start(this.app);
        });
    }

    startServer() {
        let APP_PORT = env('port') || env('APP_PORT') || 8080;
        this.app.listen(APP_PORT, () => {
            console.log(`server listening at http://localhost:${APP_PORT}`)
        });
    }

}

module.exports = Application;