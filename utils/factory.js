const pathHelper = require('./PathHelper');

module.exports = {
    createController(ClassName) {
        const controllerClass = require(pathHelper.controller_path(ClassName));
        return new controllerClass();
    },
}