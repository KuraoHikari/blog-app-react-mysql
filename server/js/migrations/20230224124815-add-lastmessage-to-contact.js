"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Contacts", "last_message", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Messages",
        },
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('Contacts', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Contacts", "last_message", {});
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
