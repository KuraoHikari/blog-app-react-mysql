const router = require('express').Router();
const { findAllPost, findPost, createPost, updatePost, deletePost } = require('../controllers');

router.get('/', findAllPost);
router.get('/:id', findPost);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
