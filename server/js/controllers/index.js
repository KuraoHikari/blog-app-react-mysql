const { loginUser, registerUser } = require('./auth-controller');
const { findAllPost, findPost, createPost, updatePost, deletePost } = require('./post-controller');
const { addContact, findAllContact } = require('./contact-controller');
const { sendMessage, getMessage } = require('./message-controller');
module.exports = {
  loginUser,
  registerUser,
  findAllPost,
  findPost,
  createPost,
  updatePost,
  deletePost,
  addContact,
  findAllContact,
  sendMessage,
  getMessage,
};
