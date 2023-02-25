'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init(
    {
      from_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'contactId required' },
          notEmpty: { msg: 'contactId required' },
          notNull: { msg: 'contactId required' },
        },
      },
      to_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'contactId required' },
          notEmpty: { msg: 'contactId required' },
          notNull: { msg: 'contactId required' },
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'desc required' },
          notNull: { msg: 'desc required' },
        },
      },
      contactUid: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          isInt: { msg: 'contactId required' },
          notEmpty: { msg: 'contactId required' },
          notNull: { msg: 'contactId required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};
