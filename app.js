const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const serverPort = process.env.PORT || 9733;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');

  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));

app.use('/heroes', require('./routes/heroRoutes'));

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
