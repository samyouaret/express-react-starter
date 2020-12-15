const pathHelper = require('../utils/pathHelper');
const methodOverride = require('method-override');
const fs = require('fs');

module.exports = {
    start(app) {
        const routesPath = pathHelper.route_path();
        app.use(methodOverride("_method"));

        fs.readdir(routesPath, (err, files) => {
            files.forEach(file => {
                console.log(`loading route ${file}`);
                let router = require(pathHelper.route_path(file));
                app.use(router);
            });
            // custom 404 middleware handler
            app.use((req, res, next) => {
                res.status(404).render('404');
            });

            // custom  middleware to handle server error
            app.use((err, req, res, next) => {
                console.log(err.stack);
                res.status(500).send("<h3>Sorry internal error occured.<h3>")
            });
        });
    }
}