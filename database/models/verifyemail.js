'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerifyEmail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  VerifyEmail.init({
    email: DataTypes.STRING,
    token: DataTypes.STRING,
    expireAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'VerifyEmail',
    createdAt:false,
    updatedAt:false,
  });
  return VerifyEmail;
};