const isApi = require('../app/middlewares/isApi');

module.exports = {
    start(app) {
        let APP_ENV = env('APP_ENV');
        if (env('NODE_ENV')) {
            env('APP_ENV', env('NODE_ENV'));
        } else {
            env('NODE_ENV', APP_ENV);
        }
        app.use(isApi);
    }
}