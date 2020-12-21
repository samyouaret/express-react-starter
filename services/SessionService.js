const session = require('express-session');
const flash = require('connect-flash');
const { getSessionStore } = require('../utils/factory');

let store = getSessionStore(session);

module.exports = {
    start(app) {
        app.use(session({
            secret: env('APP_KEY'),
            resave: false,
            cookie: {
                maxAge: 6000
            },
            saveUninitialized: false,
            store
        }));
        app.use(flash());
    }
}