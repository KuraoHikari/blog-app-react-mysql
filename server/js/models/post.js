'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: 'userId' }); //<karena FK ada di table Post
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'title required' },
          notNull: { msg: 'title required' },
        },
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'desc required' },
          notNull: { msg: 'desc required' },
        },
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'image required' },
          notNull: { msg: 'image required' },
        },
      },
      cat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Category required' },
          notNull: { msg: 'Category required' },
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
      modelName: 'Post',
    }
  );
  return Post;
};
