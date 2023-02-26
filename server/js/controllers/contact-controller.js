const { SuccessResponse } = require('../helper');
const { Contact, User, Message } = require('../models');
const { v4 } = require('uuid'); // ES5

async function addContact(req, res, next) {
  //dari token
  try {
    const contact_uid = v4();
    const { userId, user_friend } = req.body;
    console.log('🚀 ~ file: contact-controller.js:9 ~ addContact ~ user_friend:', user_friend);
    console.log('🚀 ~ file: contact-controller.js:9 ~ addContact ~ userId:', userId);

    // const result = await Contact.create({
    //   userId: userId,
    //   user_friend: user_friend,
    //   contact_uid: contact_uid,
    // });
    const result = await Message.create({
      from_user: userId,
      to_user: user_friend,
      message: 'yeay youre connected',
      contact_uid: '673ed3c7-710c-4ad8-b694-356e92c32278',
    });

    console.log('🚀 ~ file: contact-controller.js:14 ~ addContact ~ result:', result);
    res.status(201).json(SuccessResponse(result));
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function findAllContact(req, res, next) {
  try {
    // const { userId } = req.body;
    // const { page, size } = req.query;
    // const { limit, offset } = getPagination(page, size);
    const contacts = await Contact.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email'],
        },
        {
          model: User,
          as: 'userFriend',
          attributes: ['id', 'email'],
        },
        {
          model: Message,
          as: 'lastMessage',
        },
      ],
    });
    res.status(200).json(SuccessResponse(contacts));
  } catch (err) {
    console.log('🚀 ~ file: contact-controller.js:39 ~ findAllContact ~ err:', err);

    next(err);
  }
}
async function deleteContact(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}
module.exports = { addContact, findAllContact };
