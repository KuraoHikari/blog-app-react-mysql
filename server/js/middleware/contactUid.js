const { Contact, UidContact, User } = require('../models');

async function createOrSendUid(req, res, next) {
  try {
    const { id: from_user } = req.user;
    const { to_user } = req.body;
    if (Number(from_user) === Number(to_user)) {
      throw { name: 'Unauthorized' };
    } else {
      const user = await User.findByPk(to_user);
      if (!user) {
        throw { name: 'Unauthorized' };
      } else {
        const contact = await Contact.findOne({
          where: { user_friend: to_user, userId: from_user },
        });
        if (!contact) {
          const contactUid = await UidContact.create();
          const { id: contact_uid } = contactUid;
          await Contact.create({
            user_friend: to_user,
            userId: from_user,
            contactUid: contact_uid,
          });
          await Contact.create({
            user_friend: from_user,
            userId: to_user,
            contactUid: contact_uid,
          });

          req.contact = {
            contactUid: contact_uid,
          };
          next();
        } else {
          const { contactUid } = contact;

          req.contact = {
            contactUid: contactUid,
          };
          next();
        }
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = createOrSendUid;
