const morgan = require('morgan');
const pathHelper = require('../utils/pathHelper');
const fs = require('fs');

module.exports = {
    start(app) {
        // create a write stream (in append mode)
        var accessLogStream = fs.createWriteStream(pathHelper.root_path('storage/logs/access.log'), {
            flags: 'a'
        })
        // setup the logger
        app.use(morgan('combined', {
            stream: accessLogStream
        }))
    }
}