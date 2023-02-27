const errorHandler = require('./error-handler');
const authenticate = require('./authenticate');
const authorize = require('./authorize');
const multer = require('./multer');
const imageValidation = require('./imageValidation');
const imgKit = require('./imgKit');
const createOrSendUid = require('./contactUid');

module.exports = { errorHandler, authenticate, authorize, multer, imgKit, imageValidation, createOrSendUid };
