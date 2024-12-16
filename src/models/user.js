'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Address,{foreignKey : 'id',as:'addresses'});
      
      User.belongsToMany(models.Role,{
              through: "userRoles",
              foreignKey: "userId",
              otherKey:'roleId',
              as:"roles"
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};