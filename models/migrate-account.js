'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class migrate - account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  migrate - account.init({
    credentialType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'migrate-account',
  });
  return migrate - account;
};