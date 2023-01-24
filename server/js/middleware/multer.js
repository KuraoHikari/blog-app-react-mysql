const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const multerMiddleWare = upload.single('images');
// console.log('sampai sini');

module.exports = multerMiddleWare;
