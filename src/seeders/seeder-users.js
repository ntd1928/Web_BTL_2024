'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '12345',
      firstName: 'Yen',
      lastName: 'Nhung',
      address: 'VN',
      gender: 1,
      roleId: 'ROLE',
      phoneNumber: 'R1',
      positionId: 'R1',
      image: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
