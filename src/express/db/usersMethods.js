const { client } = require(".");
const bcrypt = require("bcryptjs");
const SALT_COUNT = 10


async function createUser({email, password}) {
  
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {rows: [user]} = await client.query(`
      INSERT INTO users(email, password)
      VALUES($1,$2)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email;
    `,[email, hashedPassword]);
    return user;
  
}

async function getUserByEmail(email) {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE email=$1;
    `, [email]);

    return user;
}

module.exports = {
  createUser,
  getUserByEmail
}