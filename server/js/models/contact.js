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
      Contact.belongsTo(models.User, { as: 'userFriend', foreignKey: 'user_friend' }); //<karena FK ada di table Post
      Contact.belongsTo(models.User, { as: 'user', foreignKey: 'userId' }); //<karena FK ada di table Post
      Contact.hasMany(models.Message, { foreignKey: 'contactUid' });
      Contact.belongsTo(models.Message, { as: 'lastMessage', foreignKey: 'last_message' }); //<karena FK ada di table Post
    }
  }
  Contact.init(
    {
      user_friend: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: 'user_friend required' },
          notEmpty: { msg: 'user_friend required' },
        },
      },
      last_message: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: 'userId required' },
          notEmpty: { msg: 'userId required' },
        },
      },
      contact_uid: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: { msg: 'userId required' },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: 'userId required' },
          notEmpty: { msg: 'userId required' },
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
