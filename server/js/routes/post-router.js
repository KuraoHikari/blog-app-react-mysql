const router = require('express').Router();
const { findAllPost, findPost, createPost, updatePost, deletePost } = require('../controllers');
const { authenticate } = require('../middleware');

router.get('/', findAllPost);
router.get('/:id', findPost);
router.use(authenticate);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
