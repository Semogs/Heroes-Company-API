const bcrypt = require('bcryptjs');
const Trainers = require('../models/trainerModel');
const { generateAuthToken } = require('./encryptionService');

const authenticate = async (email, password) => {
  if (!email || !password) return { success: false, error: 'Missing credentials.' };

  const user = await Trainers.findOne({ where: { email } });
  if (!user) return { success: false, error: 'Incorrect credentials.' };

  const match = await bcrypt.compare(password, user.password);
  if (!match) return { success: false, error: 'Incorrect credentials.' };

  const tokenData = {
    userEmail: email,
    trainerId: user.id
  };

  const token = await generateAuthToken(tokenData);
  return { token, trainerId: user.id, success: true };
};

const registerTrainer = async (email, password) => {
  if (!email || !password) return { success: false, error: 'Missing credentials.' };

  const hashedPassword = await bcrypt.hash(password, 10);
  await Trainers.create({ email, password: hashedPassword });

  return { success: true };
};

module.exports = {
  authenticate,
  registerTrainer
};
