const router = require('express').Router();
const { loginUser, registerUser, findUserNewContact } = require('../controllers');
const { authenticate } = require('../middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/find-user', authenticate, findUserNewContact);

module.exports = router;
