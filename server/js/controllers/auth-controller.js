const { checkPassword, signToken } = require('../helper');
const { User } = require('../models');

class userController {
  static async registerUser(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const result = await User.create({ email, password, username });
      return res.status(201).json({ id: result.id, email: result.email });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async loginUser(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await User.findOne({ where: { email: email } });
      if (result) {
        const { id, email, username, password: resPassword } = result;
        if (checkPassword(password, resPassword)) {
          const access_token = signToken({ id, username, email });
          res.status(200).json({ access_token });
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
}

module.exports = userController;
