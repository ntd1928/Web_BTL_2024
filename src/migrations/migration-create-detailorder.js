'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // 1 order has many orderdetail
    // 1 orderdetail has quantity, color, price of 1 product

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detailorders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      orderId: {
        type: Sequelize.INTEGER,
        references:{
            model:'orders',
            key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      },
      productId: {
        type: Sequelize.INTEGER,
        references:{
            model:'products',
            key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detailorders');
  }
};