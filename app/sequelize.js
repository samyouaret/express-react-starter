const {
    Sequelize,
    DataTypes
} = require('sequelize');
const {
    config_path,
    root_path
} = require('../utils/PathHelper');
const config = require(config_path('database'));
const fs = require("fs");

const initConnection = function () {
    let options = config[env('APP_ENV')];
    if (!options) {
        throw new Error(`invalid ${env('APP_ENV')} mode `);
    }
    return new Sequelize(options);
}

let sequelize = initConnection();

const models = fs.readdirSync(root_path("database/models"))
    .map((file) => root_path(`database/models/${file}`));

// We define all models according to their files.
for (const model of models) {
    require(model)(sequelize, DataTypes);
}

for (const model in sequelize.models) {
    if (sequelize.models[model].associate) {
        sequelize.models[model].associate(sequelize.models);
    }
}

module.exports = sequelize;