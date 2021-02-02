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
            let redis = require('redis');
            let RedisStore = require('connect-redis')(session);
            let redisClient = redis.createClient({
                host: env('REDIS_HOST'),
                port: env('REDIS_PORT')
            })
            redisClient.on('error', console.error);
            redisClient.on('connect', function (err) {
                console.log('Connected to redis successfully');
            });
            process.on("exit", function () {
                redisClient.quit();
            });

            return new RedisStore({ client: redisClient });
        }
    }
}