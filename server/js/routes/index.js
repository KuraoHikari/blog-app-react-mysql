const router = require('express').Router();
const authRouters = require('./auth-router');
const postRouters = require('./post-router');
const contactRouters = require('./contact-router');
const messageRouters = require('./message-router');

router.use('/auth', authRouters);
router.use('/posts', postRouters);
router.use('/contacts', contactRouters);
router.use('/messages', messageRouters);

module.exports = router;
