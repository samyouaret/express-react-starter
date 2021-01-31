const path = require('path');

module.exports = {
    store: "file",
    // store: "redis",
    path: path.resolve('../storage/sessions')
};