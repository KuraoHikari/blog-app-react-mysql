const { Message, Contact } = require('../models');

async function sendMessage(req, res, next) {
  try {
    const {} = req.body;
  } catch (err) {
    next(err);
  }
}
