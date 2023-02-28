const { Op } = require('sequelize');
const { SuccessResponse, getPagination, getPagingData } = require('../helper');
const { Message, Contact } = require('../models');

async function sendMessage(req, res, next) {
  try {
    const { id: from_user } = req.user;
    const { to_user, message } = req.body;
    const { contactUid } = req.contact;
    const result = await Message.create({
      from_user,
      to_user,
      message,
      contactUid,
    });
    const { id: message_id } = result;
    await Contact.update(
      {
        last_message: +message_id,
      },
      { where: { userId: from_user, user_friend: to_user } }
    );
    await Contact.update(
      {
        last_message: +message_id,
      },
      { where: { userId: to_user, user_friend: from_user } }
    );
    res.status(201).json(SuccessResponse(result));
  } catch (err) {
    // console.log(err);
    next(err);
  }
}

async function getMessage(req, res, next) {
  try {
    const { id } = req.params;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const { count, rows } = await Message.findAndCountAll({
      limit: limit,
      offset: offset,
      where: {
        contactUid: id,
        message: {
          [Op.not]: null, // Like: last_message IS NOT NULL
        },
      },
      order: [['createdAt', 'DESC']],
    });

    if (count === 0) {
      throw { name: 'NotFound' };
    } else {
      const data = getPagingData(rows, count, page, limit);
      return res.status(200).json(SuccessResponse(data));
    }
  } catch (err) {
    //console.log('🚀 ~ file: message-controller.js:58 ~ getMessage ~ err:', err);

    next(err);
  }
}
module.exports = { sendMessage, getMessage };
