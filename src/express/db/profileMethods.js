const { client } = require(".");

async function getAddressesByUserID(userID) {
  const {rows: [address]} = await client.query(`
    SELECT *
    FROM addresses
    WHERE user_id = $1;
  `,[userID])
  return address;
}

async function updateAddress(userID, first_name, last_name, street, city, state, zip) {
  const {rows: [address]} = await client.query(`
    UPDATE addresses
    SET first_name = $2, last_name = $3, street_address = $4, city = $5, state = $6, zip_code = $7
    WHERE user_id = $1
    RETURNING *;
  `,[userID, first_name, last_name, street, city, state, zip])
  return address
}

module.exports = {
  getAddressesByUserID,
  updateAddress
}