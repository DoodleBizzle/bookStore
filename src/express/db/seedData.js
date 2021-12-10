const products = require('./productList') 
// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index")

async function rebuildDB() {
  try {
    await client.query(`
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS genres;
    DROP TABLE IF EXISTS users;
    `);
    
    await client.query(`

    CREATE TABLE users(
      id  SERIAL PRIMARY KEY, 
      email VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL
      );

      CREATE TABLE genres(
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255)
      );


      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        author VARCHAR(255) NOT NULL,
        format VARCHAR(255) NOT NULL,
        "genreID" INTEGER REFERENCES genres(id),
        isbn VARCHAR(13) UNIQUE NOT NULL,
        cover_url VARCHAR(255),
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER NOT NULL
      );

      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        "userID" INTEGER REFERENCES users(id) NOT NULL,
        "productID" INTEGER REFERENCES products(id) NOT NULL,
        quantity INTEGER NOT NULL
        UNIQUE ("userID", "productID")
      );


    `)    // drop tables in correct order
    // build tables in correct order
  } catch (error) {
    throw error
  }
}

async function seedData() {
  try {

  const users = [
    { email: "testuser", password: "testuser999" }
  ];

  

  const genres = [
    {name: "History"},
    {name: "Horror"},
    {name: "Manga"},
    {name: "Fantasy"},
    {name: "Romance"}
  ];

  const carts = [
    {productID: "1", userID: "1", quantity: 2},
    {productID: "2", userID: "1", quantity: 1}
  ]

  for(const user of users) {
    await client.query(/*sql*/`
      INSERT INTO users
      (email, password)
      VALUES ($1, $2);
    `,[user.email, user.password]);
  }

  for(const product of products) {
    await client.query(`
      INSERT INTO products
      (title, description, author, format, isbn, cover_url, price, stock)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,[product.title, product.description, product.author, product.format, product.isbn, product.cover_url, product.price, product.stock]);
  }

  for(const cart of carts) {
    await client.query(`
    INSERT INTO carts("productID", "userID", quantity)
    VALUES ($1, $2, $3)
    `,[cart.productID, cart.userID, cart.quantity])
  }

  for(const genre of genres) {
    await client.query(`
    INSERT INTO genres
    (name)
    VALUES ($1);
    `, [genre.name]);
  }

  // create useful starting data
  } catch (error) {
    throw error
  }
}

module.exports = {
  rebuildDB,
  seedData,
}


