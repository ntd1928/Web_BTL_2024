'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Feedback.belongsTo(models.Product,{foreignKey:'id',as:'products'})
      Feedback.belongsTo(models.User,{foreignKey:'id',as:'users'})
    }
  }
  Feedback.init({
    content: DataTypes.TEXT,
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};