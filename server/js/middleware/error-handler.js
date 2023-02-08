const { FailedResponse } = require('../helper');
const errorCodes = require('./err-code');

function errorHandler(err, req, res, next) {
  console.log(err.name);
  // if(err.message && err.message )
  const error = errorCodes[err.name] || errorCodes.default;
  return res.status(error.code).json(FailedResponse(error.message(err)));
}

module.exports = errorHandler;
