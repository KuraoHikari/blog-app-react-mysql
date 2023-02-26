const router = require('express').Router();
const { addContact, findAllContact } = require('../controllers');

router.post('/', findAllContact);

module.exports = router;
