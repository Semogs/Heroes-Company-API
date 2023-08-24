const Heroes = require('../models/heroModel');

const getAllHeroes = async () => {
  const allHeroes = await Heroes.findAll();
  if (!allHeroes || !allHeroes.length) return { success: false, message: 'No heroes found' };

  return { allHeroes, success: true };
};

const trainHero = async (heroGuid, trainerId) => {
  const hero = await Heroes.findOne({ where: { guid: heroGuid } });

  if (!hero) {
    return { success: false, message: 'Hero not found' };
  }

  const res = await updateHeroTraining(hero, trainerId);

  return res;
};

const updateHeroTraining = async (hero, trainerId) => {
  const currentDate = new Date();
  const lastTrainedDate = new Date(hero.dataValues.last_trained_date);

  if (!isSameDay(lastTrainedDate, currentDate)) {
    await resetDailyTrainingCount(hero, currentDate);
  }

  if (hero.dataValues.daily_training_count < 5) {
    return await trainHeroOnce(hero, trainerId);
  } else {
    return { success: false, error: 'Hero has already trained 5 times today' };
  }
};

const resetDailyTrainingCount = async (hero, currentDate) => {
  await hero.update({
    daily_training_count: 0,
    last_trained_date: currentDate
  });
};

const trainHeroOnce = async (hero, trainerId) => {
  const newPower = calculateNewPower(hero.dataValues.current_power);
  await hero.update({
    current_power: newPower,
    train_count: hero.dataValues.train_count + 1,
    daily_training_count: hero.dataValues.daily_training_count + 1,
    trainer_id: trainerId
  });
  return { newPower, success: true };
};

function calculateNewPower(currentPower) {
  const growthPercentage = Math.random() * 0.1;
  const newPower = currentPower * (1 + growthPercentage);
  return Math.round(newPower * 100) / 100;
}

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

module.exports = { getAllHeroes, trainHero };
