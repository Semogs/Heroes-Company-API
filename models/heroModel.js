const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../services/mysqlHandler');

const Heroes = sequelize.define(
  'Heroes',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ability: {
      type: DataTypes.ENUM('Attacker', 'Defender'),
      allowNull: false
    },
    guid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    training_start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    suit_colors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    starting_power: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    current_power: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    daily_training_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    last_trained_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);

module.exports = Heroes;
