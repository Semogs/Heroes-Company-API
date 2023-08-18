const { JWT_AUTH_TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Needs Login.' });
  }

  try {
    const tokenData = jwtVerification(token, JWT_AUTH_TOKEN_SECRET);

    req.body.userEmail = tokenData.userEmail;
    req.body.trainerId = tokenData.trainerId;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid Token.' });
  }
}

const jwtVerification = (token, tokenSecret) => {
  try {
    const tokenData = jwt.verify(token, tokenSecret);
    return tokenData;
  } catch (err) {
    switch (err.name) {
      case 'JsonWebTokenError':
        throw new Error('Invalid Bearer Token. Needs Login.');
      case 'TokenExpiredError': {
        throw new Error('Session Expired. Needs Login.');
      }
      default:
        throw err;
    }
  }
};

module.exports = { verifyToken };
