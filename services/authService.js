const bcrypt = require('bcryptjs');
const { generateAuthToken } = require('./encryptionService');
const { getTrainer, createTrainer } = require('./mysqlHandler');

const authenticate = async (email, password) => {
  if (!email || !password) return { success: false, error: 'Missing credentials.' };

  const user = await getTrainer(email);
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
  await createTrainer(email, hashedPassword);

  return { success: true };
};

module.exports = {
  authenticate,
  registerTrainer
};
