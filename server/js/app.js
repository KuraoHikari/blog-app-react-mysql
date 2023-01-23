if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const cors = require('cors');
const express = require('express');
const router = require('./routes/index');
const { errorHandler } = require('./middleware');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log('run', port);
});
