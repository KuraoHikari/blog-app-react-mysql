const { SuccessResponse, getPagingData, getPagination } = require('../helper');
const { Contact, User, Message } = require('../models');
const { v4 } = require('uuid'); // ES5
const { Op } = require('sequelize');

//depricated
async function addContact(req, res, next) {
  //dari token
  try {
    const contact_uid = v4();
    const { userId, user_friend } = req.body;

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
    const { id } = req.user;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const { count, rows } = await Contact.findAndCountAll({
      limit: limit,
      offset: offset,
      where: {
        userId: +id,
        last_message: {
          [Op.not]: null, // Like: last_message IS NOT NULL
        },
      },
      order: [['createdAt', 'DESC']],
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

    if (count === 0) {
      throw { name: 'NotFound' };
    } else {
      const data = getPagingData(rows, count, page, limit);
      return res.status(200).json(SuccessResponse(data));
    }
  } catch (err) {
    // console.log('🚀 ~ file: contact-controller.js:65 ~ findAllContact ~ err:', err);

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
