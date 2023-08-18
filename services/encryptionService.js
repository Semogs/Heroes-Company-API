const jwt = require('jsonwebtoken');

const generateGenericAuthenticationFunction = (secret, expiresIn) => (tokenData) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      tokenData,
      secret,
      {
        expiresIn
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });

const generateAuthToken = generateGenericAuthenticationFunction(process.env.JWT_AUTH_TOKEN_SECRET, '12h');

module.exports = {
  generateAuthToken
};
