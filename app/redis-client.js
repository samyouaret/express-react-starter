const redis = require('redis');
let redisClient = redis.createClient({
    host: env('REDIS_HOST'),
    port: env('REDIS_PORT')
})
redisClient.on('error', console.error);
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

module.exports = redisClient;