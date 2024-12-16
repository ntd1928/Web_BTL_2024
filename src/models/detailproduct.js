'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetailProduct.belongsTo(models.Product,{foreignKey:'productId',as:'products'})
      DetailProduct.belongsTo(models.Color,{foreignKey:'colorId',as:'colors'})
    }
  }
  DetailProduct.init({
    productId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    qtyProduct: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetailProduct',
  });
  return DetailProduct;
};