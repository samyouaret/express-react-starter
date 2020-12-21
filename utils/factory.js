const pathHelper = require('./PathHelper');

module.exports = {
    createController(ClassName) {
        const controllerClass = require(pathHelper.controller_path(ClassName));
        return new controllerClass();
    },
    getSessionStore(session) {
        if (config('session').store == 'file') {
            let Store = require('session-file-store')(session);
            return new Store({
                path: config('session').path,
                retries: 0
            });
        } else if (config('session').store == 'redis') {
            let redis = require('redis');
            let RedisStore = require('connect-redis')(session);
            let redisClient = redis.createClient()
            redisClient.on('error', console.error);
            return new RedisStore({ client: redisClient });
        }
    }
}