'use strict';
const { Model } = require('sequelize');
const { v4 } = require('uuid'); // ES5
module.exports = (sequelize, DataTypes) => {
  class UidContact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UidContact.hasMany(models.Contact, { as: 'uidContact', foreignKey: 'contactUid' });
      UidContact.hasMany(models.Message, { as: 'messageUid', foreignKey: 'contactUid' });
    }
  }
  UidContact.init(
    {
      contactUid: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: { msg: 'contactUid required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'UidContact',
      hooks: {
        beforeCreate: (contact, opt) => {
          const contact_uid = v4();
          contact.contactUid = contact_uid;
        },
      },
    }
  );
  return UidContact;
};
