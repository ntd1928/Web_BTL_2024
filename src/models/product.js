'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category,{foreignKey:'categoryId',as:'categories'})
      Product.hasMany(models.DetailProduct,{foreignKey : 'id',as:'detailproducts'});
      Product.hasMany(models.ProductPhoto,{foreignKey : 'id',as:'productphotos'});
      Product.hasMany(models.Feedback,{foreignKey : 'id',as:'feedbacks'});
    }
  }
  Product.init({
    name: DataTypes.STRING,
    photo: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    discountPer: DataTypes.INTEGER,
    totalQty: DataTypes.INTEGER,
    slug:DataTypes.STRING,
    content: DataTypes.TEXT,
    hidden: DataTypes.BOOLEAN,
    newArrival: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};