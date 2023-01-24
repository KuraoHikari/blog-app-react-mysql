const router = require('express').Router();
const { findAllPost, findPost, createPost, updatePost, deletePost } = require('../controllers');
const { authenticate, multer, imageValidation, imgKit, authorize } = require('../middleware');

router.get('/', findAllPost);
router.get('/:id', findPost);
router.use(authenticate);
router.post('/', multer, imageValidation, imgKit, createPost);

router.put('/:id', authorize, multer, imageValidation, imgKit, updatePost);
router.delete('/:id', authorize, deletePost);

module.exports = router;
