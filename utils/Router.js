const express = require('express');
const {
    createController
} = require('./factory');

const mergeMiddlewares = (options) => {
    let middlewares = {
        index: [],
        show: [],
        create: [],
        edit: [],
        store: [],
        update: [],
        destroy: [],
        before: []
    };
    if (options.middlewares) {
        for (const method in middlewares) {
            if (options.middlewares.hasOwnProperty(method)) {
                if (Array.isArray(options.middlewares[method])) {
                    middlewares[method].push(...options.middlewares[method]);
                } else {
                    throw new Error(`expected ${method} to be array but ${options.middlewares[method]} given`);
                }
            }
        }
    }
    return middlewares;
}

module.exports = {
    resources(url, controllerName, options = {}) {
        let middlewares = mergeMiddlewares(options);
        const router = options.router || express.Router();
        url = url.replace(/\//g, '');
        let param = options.param ? options.param : url.replace(/s$/, '');
        let controller = createController(controllerName);
        url = '/' + url;
        let singleResourceUrl = url + "/:" + param;
        // create view
        router.get(url + '/create', middlewares.create, controller.create.bind(controller));
        // edit view
        router.get(singleResourceUrl + '/edit', middlewares.edit, controller.edit.bind(controller));
        // update method
        router.put(singleResourceUrl, middlewares.update, controller.update.bind(controller));
        // destroy
        router.delete(singleResourceUrl, middlewares.destroy, controller.destroy.bind(controller));
        // get single resource
        router.get(singleResourceUrl, middlewares.show, controller.show.bind(controller));
        // collection of resources
        router.get(url, middlewares.index, controller.index.bind(controller));
        // store method
        router.post(url, middlewares.store, controller.store.bind(controller));

        return router;
    }
}