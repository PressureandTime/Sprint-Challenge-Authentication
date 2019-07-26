const bcrypt = require('bcryptjs');
const db = require('../dbConfig');

async function findBy(userData) {
  const [key] = Object.keys(userData);
  const [value] = Object.values(userData);

  return db('users')
    .where({ [key]: value })
    .first();
}

async function registerUser(userData) {
  const { password } = userData;
  const hashedPassword = bcrypt.hashSync(password, 10);
  userData.password = hashedPassword;

  const [id] = await db('users').insert(userData);
  return findBy({ id });
}

module.exports = {
  registerUser,
  findBy,
};
