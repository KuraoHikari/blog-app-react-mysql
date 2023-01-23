const { getPagination, getPagingData } = require('../helper');
const { Post, User } = require('../models');

async function findAllPost(req, res, next) {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const { count, rows } = await Post.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['email', 'id'],
        },
      ],
    });

    if (count === 0) {
      throw { name: 'NotFound' };
    } else {
      const data = getPagingData(rows, count, page, limit);
      return res.status(200).json(data);
    }
  } catch (err) {
    next(err);
  }
}
async function findPost(req, res, next) {
  try {
    const { id } = req.params;
    const post = await Post.findOne({
      where: { id: +id },
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });
    if (!post) {
      throw { name: 'NotFound' };
    }
    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}
async function createPost(req, res, next) {
  const { title, desc, image, cat } = req.body;
  const { id } = req.user;
  try {
    const result = await Post.create({ title, desc, image, userId: id, cat: cat });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
async function updatePost(req, res, next) {
  try {
    const { id } = req.params;
    const { title, desc, image, cat } = req.body;
    const post = await Post.findByPk(id);
    if (!post) {
      throw { name: 'NotFound' };
    }

    const updatedPost = await post.update({ title, desc, image, cat });
    return res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
}
async function deletePost(req, res, next) {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      throw { name: 'NotFound' };
    }

    await post.destroy();

    return res.status(200).json({ message: `${post.title} succesfully deleted` });
  } catch (err) {
    next(err);
  }
}

module.exports = { findAllPost, findPost, createPost, updatePost, deletePost };
