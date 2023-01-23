const bcrypt = require('bcrypt');

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(15));
}

function checkPassword(password, hashPass) {
  return bcrypt.compareSync(password, hashPass);
}

module.exports = { hashPassword, checkPassword };
