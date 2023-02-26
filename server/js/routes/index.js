const router = require('express').Router();
const authRouters = require('./auth-router');
const postRouters = require('./post-router');
const contactRouters = require('./contact-router');

router.use('/auth', authRouters);
router.use('/posts', postRouters);
router.use('/contacts', contactRouters);

module.exports = router;
