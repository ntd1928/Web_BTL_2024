'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User,{foreignKey:'userId',as:'users'})
    }
  }
  Address.init({
    fullName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    ward: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    shippingAdr: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};