'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await Boards.drop();
    console.log("Boards table dropped!");
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
