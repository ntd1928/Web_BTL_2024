'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetailOrder.belongsTo(models.Product,{foreignKey:'productId',as:'products'})
      DetailOrder.belongsTo(models.Order,{foreignKey:'orderId',as:'orders'})
    }
  }
  DetailOrder.init({
    quantity: DataTypes.INTEGER,
    color: DataTypes.STRING,
    price: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DetailOrder',
  });
  return DetailOrder;
};