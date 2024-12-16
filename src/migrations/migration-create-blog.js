'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.TEXT
      },
      writer: {
        type: Sequelize.STRING
      },
      slug:{
        type: Sequelize.STRING
      },
      description:{
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      hidden: {
        type: Sequelize.BOOLEAN
      },
      newBlog:{
        type:Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blogs');
  }
};