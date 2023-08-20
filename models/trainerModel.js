const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/mysqlHandler');

const Trainers = sequelize.define(
  'trainers',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = Trainers;
