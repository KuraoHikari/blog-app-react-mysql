const { verifToken } = require('../helper');
const { User } = require('../models');

async function authenticate(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: 'Unauthorized' };
    } else {
      const payload = verifToken(access_token);
      const user = await User.findByPk(payload.id);
      if (!user) {
        throw { name: 'Unauthorized' };
      } else {
        req.user = {
          id: payload.id,
          email: payload.email,
          username: payload.username,
        };

        next();
      }
    }
  } catch (err) {
    // console.log(err);
    next(err);
  }
}

module.exports = authenticate;
