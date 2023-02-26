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
      Message.belongsTo(models.Contact, { foreignKey: 'contactUid' }); //<karena FK ada di table Post
      // define association here
      Message.hasOne(models.Contact, { as: 'lastMessage', foreignKey: 'last_message' });
    }
  }
  Message.init(
    {
      from_user: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: 'contactId required' },
          notEmpty: { msg: 'contactId required' },
        },
      },
      to_user: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: 'contactId required' },
          notEmpty: { msg: 'contactId required' },
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'desc required' },
        },
      },
      contactUid: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: { msg: 'contactId required' },
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
