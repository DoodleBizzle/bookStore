const products = require("./productList");
const addresses = require("./addressesList")
const bcrypt = require("bcryptjs");
const SALT_COUNT = 10;
// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

async function rebuildDB() {
  try {
    await client.query(`
    DROP TABLE IF EXISTS addresses;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS genres;
    DROP TABLE IF EXISTS users;
    `);

    await client.query(`

    CREATE TABLE users(
      id  SERIAL PRIMARY KEY, 
      email VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL,
      admin BOOLEAN DEFAULT FALSE
      );

    CREATE TABLE addresses(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      street_address VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      zip_code CHAR(5) NOT NULL
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
      quantity INTEGER NOT NULL,
      UNIQUE ("userID", "productID")
    );
  `);
  } catch (error) {
    throw error;
  }
}

async function seedData() {
  try {
    const users = [
      { 
        email: "testuser@demo.com", 
        password: "testuser"
      },
      { 
        email: "tester@test.com",
        password: "password" 
      },
      {
        email: "barrypaulrichard@gmail.com",
        password: "password",
        admin: "TRUE",
      },
    ];

    const genres = [
      { name: "History" },
      { name: "Horror" },
      { name: "Sci-fi" },
      { name: "Fantasy" },
      { name: "Nonfiction" },
    ];

    const carts = [
      { productID: "1", userID: "1", quantity: 2 },
      { productID: "2", userID: "1", quantity: 1 },
      { productID: "5", userID: "1", quantity: 1 },
      { productID: "10", userID: "2", quantity: 1 },
      { productID: "6", userID: "2", quantity: 1 },
    ];

    for (const user of users) {
      const hashed = await bcrypt.hash(user.password, SALT_COUNT);
      await client.query(
        `
      INSERT INTO users
      (email, password, admin)
      VALUES ($1, $2, $3);
    `,
        [user.email, hashed, user.admin]
      );
    }

    for (const genre of genres) {
      await client.query(
        `
    INSERT INTO genres
    (name)
    VALUES ($1);
    `,
        [genre.name]
      );
    }

    for (const product of products) {
      await client.query(
        `
      INSERT INTO products
      (title, description, author, format, isbn, cover_url, price, stock, "genreID")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `,
        [
          product.title,
          product.description,
          product.author,
          product.format,
          product.isbn,
          product.cover_url,
          product.price,
          product.stock,
          product.genreID,
        ]
      );
    }

    for (const cart of carts) {
      await client.query(
        `
    INSERT INTO carts("productID", "userID", quantity)
    VALUES ($1, $2, $3)
    `,
        [cart.productID, cart.userID, cart.quantity]
      );
    }

    for (const address of addresses) {
      await client.query(
        `
        INSERT INTO addresses("user_id", "first_name", "last_name", "street_address", "city", "state", "zip_code")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,[
          address.user_id,
          address.first_name,
          address.last_name,
          address.street_address,
          address.city,
          address.state,
          address.zip_code
          ]
      );
    }

  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
  seedData,
};
