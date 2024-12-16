'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      discountPer: {
        type: Sequelize.INTEGER
      },
      totalQty:{
        type:Sequelize.INTEGER
      },
      slug:{
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      hidden:{
        type: Sequelize.BOOLEAN
      },
      newArrival:{
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:{
            model:'categories',
            key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};