'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      Blog.hasMany(models.Comment,{foreignKey : 'id',as:'comments'});
    }
  }
  Blog.init({
    name: DataTypes.STRING,
    photo: DataTypes.TEXT,
    writer: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    hidden: DataTypes.BOOLEAN,
    newBlog:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};