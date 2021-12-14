const {client} = require('.');

async function getProductsBySearch(term) {
  const {rows} = await client.query(`
    SELECT * 
    FROM genres
    JOIN products
    ON genres.id = products."genreID"
    WHERE products.title ILIKE $1
      OR products.author ILIKE $1 
      OR genres.name ILIKE $1 
      OR products.format ILIKE $1;
  `,[`%${term}%`])
  return rows
}

module.exports = {getProductsBySearch}