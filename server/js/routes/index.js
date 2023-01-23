const router = require('express').Router();
const authRouters = require('./auth-router');
const postRouters = require('./post-router');

router.use('/auth', authRouters);
router.use('/posts', postRouters);

module.exports = router;
