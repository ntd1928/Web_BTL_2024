'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // 1 user has many orders
  // order has grandtotal, status, deliveryDate, message
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number:{
        type: Sequelize.STRING
      },
    // tong cong
      grandtotal: {
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('processing','shipping','delivered','cancel'),
				defaultValue: 'processing'
      },
      deliveryDate: {
            type: Sequelize.DATE,
        },
      userId: {
        type: Sequelize.INTEGER,
        references:{
            model:'users',
            key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      },
      addressId: {
        type: Sequelize.INTEGER,
        references:{
            model:'addresses',
            key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
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
    await queryInterface.dropTable('orders');
  }
};