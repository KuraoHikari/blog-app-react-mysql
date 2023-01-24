const axios = require('axios');
const FormData = require('form-data');

async function imgKit(req, res, next) {
  try {
    if (req.body.image && !req.file) {
      next();
    } else {
      const fileEncode = req.file.buffer.toString('base64');
      const form = new FormData();
      form.append('file', fileEncode);
      form.append('fileName', req.file.originalname);
      const privKey = new Buffer.from(process.env.PRIVATE_API_IMG_KIT + ':', 'utf-8').toString('base64');
      const response = await axios.post(process.env.IMGKIT, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: 'Basic ' + privKey,
        },
      });

      req.body.image = response.data.url;
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = imgKit;
