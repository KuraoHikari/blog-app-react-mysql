function imgValidate(req, res, next) {
  if (req.file && !req.body.image) {
    if (!req.file.originalname.match(/\.(png|jpg|jpeg|gif|bmp)$/)) {
      next({ name: 'non Image Format' });
    } else {
      if (req.file.size >= 261120) {
        next({ name: 'max image size is 255kb' });
      } else {
        next();
      }
    }
  } else {
    if (req.body.image && !req.file) {
      next();
    } else {
      next({ name: 'invalid image' });
    }
  }
}
module.exports = imgValidate;
