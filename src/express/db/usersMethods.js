const { client } = require(".");
const bcrypt = require("bcryptjs")
const SALT_COUNT = 10


async function createUser({email, password}) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {rows: [user]} = await client.query(`
      INSERT INTO users(email, password)
      VALUES($1,$2)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email;
    `,[email, hashedPassword]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE email=$1;
    `, [email]);

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail
}