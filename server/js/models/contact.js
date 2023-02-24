'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init(
    {
      user_friend: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'user_friend required' },
          notEmpty: { msg: 'user_friend required' },
          notNull: { msg: 'user_friend required' },
        },
      },
      last_message: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'userId required' },
          notEmpty: { msg: 'userId required' },
          notNull: { msg: 'userId required' },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'userId required' },
          notEmpty: { msg: 'userId required' },
          notNull: { msg: 'userId required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Contact',
    }
  );
  return Contact;
};
