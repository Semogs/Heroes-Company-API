const { Sequelize } = require('sequelize');
const Trainers = require('../models/trainerModel');
const Heroes = require('../models/heroModel');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql'
});

const getAllHeroes = async () => await Heroes.findAll();

const getHero = async (heroGuid) => await Heroes.findOne({ where: { guid: heroGuid } });

const updateHero = async (hero, updatedInfo) => await hero.update(updatedInfo);

const getTrainer = async (email) => Trainers.findOne({ where: { email } });

const createTrainer = async (email, password) => await Trainers.create({ email, password });

module.exports = {
  sequelize,
  getAllHeroes,
  getHero,
  updateHero,
  getTrainer,
  createTrainer
};
