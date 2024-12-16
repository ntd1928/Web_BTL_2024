'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        ProductPhoto.belongsTo(models.Product,{foreignKey:'productId',as:'products'})
    }
  }
  ProductPhoto.init({
    productId: DataTypes.INTEGER,
    path: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'ProductPhoto',
  });
  return ProductPhoto;
};