const authRouter = require('express').Router();
const authService = require('../services/authService');

authRouter.post('/authenticate', (req, res) => {
  authService
    .authenticate(req.body.email, req.body.password)
    .then((ans) => res.json(ans))
    .catch((error) => {
      res.status(500).json({ error: 'Error authenticating: ' + error });
    });
});

authRouter.post('/register', (req, res) => {
  authService
    .registerTrainer(req.body.email, req.body.password)
    .then((ans) => res.json(ans))
    .catch((error) => {
      res.status(500).json({ error: 'Error authenticating: ' + error });
    });
});

module.exports = authRouter;
