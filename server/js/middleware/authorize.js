const { Post } = require('../models');

async function authorize(req, res, next) {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return next({ name: 'NotFound' });
    }
    const authorId = post.userId;

    if (authorId !== req.user.id) {
      return next({ name: 'Forbidden Access' });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authorize;
