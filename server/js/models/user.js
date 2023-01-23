'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'must be in Email Format' },
          notEmpty: { msg: 'Email required' },
          notNull: { msg: 'Email required' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'password required' },
          notNull: { msg: 'password required' },
          lengthPassword(value) {
            if (value.length < 5) {
              throw new Error('invalid passwordlength');
            }
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'username required' },
          notNull: { msg: 'username required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, opt) => {
          user.password = hashPassword(user.password);
          if (user.role === undefined) {
            user.role = 'admin';
          }
        },
      },
    }
  );
  return User;
};
