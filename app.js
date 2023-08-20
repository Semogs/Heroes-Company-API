const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const serverPort = process.env.PORT || 9733;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));

app.use('/heroes', require('./routes/heroRoutes'));

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
