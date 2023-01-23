const { loginUser, registerUser } = require('./auth-controller');
const { findAllPost, findPost, createPost, updatePost, deletePost } = require('./post-controller');

module.exports = {
  loginUser,
  registerUser,
  findAllPost,
  findPost,
  createPost,
  updatePost,
  deletePost,
};
