const { checkPassword, signToken, SuccessResponse } = require('../helper');
const { User, Contact } = require('../models');

async function registerUser(req, res, next) {
  try {
    const { email, password, username } = req.body;

    const result = await User.create({ email, password, username });

    const { id } = result;
    const access_token = signToken({ id, username, email });

    return res.status(200).json(SuccessResponse({ id, username, email, token: access_token }));
  } catch (err) {
    next(err);
  }
}
async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({ where: { email: email } });
    if (result) {
      const { id, email, username, password: resPassword } = result;
      if (checkPassword(password, resPassword)) {
        const access_token = signToken({ id, username, email });
        res.status(200).json(SuccessResponse({ id, username, email, token: access_token }));
      } else {
        throw { name: 'UnauthorizedLogin' };
      }
    } else {
      throw { name: 'UnauthorizedLogin' };
    }
  } catch (err) {
    next(err);
  }
}

async function findUserNewContact(req, res, next) {
  try {
    const { id: from_user } = req.user;
    const { email } = req.body;
    const newFriend = await User.findOne({
      where: { email: email },
    });

    if (!newFriend) {
      throw { message: 'User Not Found' };
    } else {
      const { id: newFriendId, email, username } = newFriend;

      if (newFriendId === from_user) {
        throw { message: 'bruhhh' };
      }

      const contact = await Contact.findOne({
        where: { user_friend: newFriendId, userId: from_user },
      });

      if (!contact) {
        res.status(200).json(SuccessResponse({ newFriendId, email, username }));
      } else {
        throw { message: 'User has been your friend' };
      }
    }
  } catch (err) {
    console.log('🚀 ~ file: auth-controller.js:59 ~ findUserNewContact ~ err:', err);

    next(err);
  }
}

module.exports = {
  registerUser,
  loginUser,
  findUserNewContact,
};
