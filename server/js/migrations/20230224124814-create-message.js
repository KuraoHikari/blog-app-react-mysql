'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      from_user: {
        type: Sequelize.INTEGER,
      },
      to_user: {
        type: Sequelize.INTEGER,
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      contactUid: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Contacts',
          },
          key: 'contact_uid',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  },
};
