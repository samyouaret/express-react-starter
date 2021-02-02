const { env } = require('../utils/pathHelper');

module.exports = {
    development: {
        username: env('DB_USERNAME'),
        password: env('DB_PASSWORD'),
        database: env('DB_DATABASE'),
        host: env('DB_HOST'),
        port: 3306,
        dialect: env('DB_CONNECTION'),
        dialectOptions: {
            bigNumberStrings: true,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        },
        timezone: '+01:00',
        logging: false,
    },
    test: {
        username: env('DB_USERNAME'),
        password: env('DB_PASSWORD'),
        database: env('DB_DATABASE_TEST'),
        host: env('DB_HOST'),
        port: 3306,
        dialect: env('DB_CONNECTION'),
        dialectOptions: {
            bigNumberStrings: true,
        },
        logging: false,
        timezone: '+01:00',
    },
    production: {
        username: env('DB_USERNAME'),
        password: env('DB_PASSWORD'),
        database: env('DB_DATABASE'),
        host: env('DB_HOST'),
        port: 3306,
        dialect: env('DB_CONNECTION'),
        dialectOptions: {
            bigNumberStrings: true
        },
        logging: false
    }
};