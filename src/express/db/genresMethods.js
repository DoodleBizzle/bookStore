const { client } = require(".");

async function getAllGenres() {
    const { rows } = await client.query(`
      SELECT *
      FROM genres
    `, []);

    return rows;
}

async function getAllProductsByGenre(genreID) {
  const { rows } = await client.query(`
    SELECT *
    FROM products
    WHERE "genreID" = $1
  `, [genreID])
}

module.exports = {
    getAllGenres,
    getAllProductsByGenre
}