require('dotenv').config({ debug: false });
const Application = require('./Application');

module.exports = {
    start: function () {
        app = new Application();
        app.start();
    }
}