const session = require('express-session');
const flash = require('connect-flash');

// let store  = config('store') == 'file' ? require('session-file-store'): require('redis-connect');
let Store = require('session-file-store')(session);
module.exports = {
    start(app) {
        app.use(session({
            secret: env('APP_KEY'),
            resave: false,
            cookie: {
                maxAge:  6000
            },
            saveUninitialized: false,
            store: new Store({
                path: config('session').path,
                retries: 0
            })
        }));
        app.use(flash());
    }
}