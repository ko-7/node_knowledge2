'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable("Boards")
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
