const { checkPassword, signToken, SuccessResponse } = require('../helper');
const { User } = require('../models');

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

module.exports = {
  registerUser,
  loginUser,
};
