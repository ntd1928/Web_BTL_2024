'use strict';
const {
  Model
} = require('sequelize');
const address = require('./address');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User,{foreignKey:'userId',as:'users'});
      Order.belongsTo(models.Address,{foreignKey:'addressId',as:'addresses'})
    }
  }
  Order.init({
    number: DataTypes.STRING,
    grandtotal: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    status: DataTypes.ENUM('processing','shipping','delivered','cancel'),
    deliveryDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};