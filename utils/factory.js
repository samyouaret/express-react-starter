const pathHelper = require('./pathHelper');

module.exports = {
    createController(ClassName) {
        const controllerClass = require(pathHelper.controller_path(ClassName));
        return new controllerClass();
    },
    getSessionStore(session) {
        if (config('session').store == 'file') {
            let FileStore = require('session-file-store')(session);
            return new FileStore({
                path: config('session').path,
                retries: 0
            });
        } else if (config('session').store == 'redis') {
            let redisClient = require('../app/redis-client');
            let RedisStore = require('connect-redis')(session);

            return new RedisStore({ client: redisClient });
        }
    }
}