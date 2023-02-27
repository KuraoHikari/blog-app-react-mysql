const router = require('express').Router();
const { sendMessage, getMessage } = require('../controllers');
const { authenticate, createOrSendUid } = require('../middleware');

router.post('/', authenticate, createOrSendUid, sendMessage);
router.get('/:id', authenticate, getMessage);

module.exports = router;
