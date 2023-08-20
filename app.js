const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const serverPort = process.env.PORT || 9733;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://semogs.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

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
