'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // 1 user has many cart with many create date
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('carts');
  }
};