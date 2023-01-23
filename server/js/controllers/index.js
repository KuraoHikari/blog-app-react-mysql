const authController = require('./auth-controller');
const postController = require('./post-controller');

const loginUser = authController.loginUser;
const registerUser = authController.registerUser;
const findAllPost = postController.findAllPost;
const findPost = postController.findPost;
const createPost = postController.createPost;
const updatePost = postController.updatePost;
const deletePost = postController.deletePost;

module.exports = {
  loginUser,
  registerUser,
  findAllPost,
  findPost,
  createPost,
  updatePost,
  deletePost,
};
