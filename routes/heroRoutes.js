const heroRouter = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');
const heroService = require('../services/heroService');

heroRouter.get('/', verifyToken, (req, res) => {
  heroService
    .getAllHeroes()
    .then((heroes) => {
      res.json(heroes);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error fetching heroes: ' + error });
    });
});

heroRouter.post('/train', verifyToken, (req, res) => {
  heroService
    .trainHero(req.body.guid, req.body.trainerId)
    .then((heroes) => {
      res.json(heroes);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error training hero: ' + error });
    });
});

module.exports = heroRouter;
