if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const jwt = require('jsonwebtoken');

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}
function verifToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { signToken, verifToken };
