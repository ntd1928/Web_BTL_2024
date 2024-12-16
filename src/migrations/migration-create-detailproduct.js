'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detailproducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qtyProduct: {
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
      productId: {
        type: Sequelize.INTEGER,
        references:{
            model:'products',
            key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      },
      colorId: {
        type: Sequelize.INTEGER,
        references:{
            model:'colors',
            key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detailproducts');
  }
};
