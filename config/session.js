const path = require('path');

let dir = path.join(path.dirname(__dirname),'storage','sessions');

module.exports = {
    store: "file",
    store: "redis",
    path: dir
};