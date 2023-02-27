const router = require('express').Router();
const { findAllContact } = require('../controllers');
const { authenticate } = require('../middleware');

router.get('/', authenticate, findAllContact);

module.exports = router;
