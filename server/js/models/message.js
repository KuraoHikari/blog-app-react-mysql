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
      Message.belongsTo(models.UidContact, { as: 'messageUid', foreignKey: 'contactUid' }); //<karena FK ada di table Post
      Message.hasOne(models.Contact, { as: 'lastMessage', foreignKey: 'last_message' });
    }
  }
  Message.init(
    {
      from_user: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: 'from_user required' },
          notEmpty: { msg: 'from_user required' },
        },
      },
      to_user: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: 'to_user required' },
          notEmpty: { msg: 'to_user required' },
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'message required' },
        },
      },
      contactUid: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: 'contactUid required' },
          notEmpty: { msg: 'contactUid required' },
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
