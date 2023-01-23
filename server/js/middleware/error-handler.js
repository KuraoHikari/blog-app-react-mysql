const errorCodes = require('./err-code');

function errorHandler(err, req, res, next) {
  const error = errorCodes[err.name] || errorCodes.default;
  return res.status(error.code).json(error.message(err));
}

module.exports = errorHandler;
