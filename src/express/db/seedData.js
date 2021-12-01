// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index")

async function rebuildDB() {
  try {
    await client.query(/*sql*/`
      DROP TABLE IF EXISTS carts
      DROP TABLE IF EXISTS users;
    `);

    await client.query(/*sql*/`
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        email VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        "userID" INTEGER REFERENCES users(id),
        "productID" INTEGER REFERENCES products(id),
        quantity INTEGER
      );
      
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        author VARCHAR(255) NOT NULL,
        format VARCHAR(255) NOT NULL,
        "genreID" INTEGER REFERENCES genres(id),
        isbn INTEGER UNIQUE NOT NULL,
        cover_url TEXT,
        price FLOAT(6,2) NOT NULL,
        stock INTEGER NOT NULL
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

  const products = [
    {title: "Notes from Underground", author: "Fyodor Dostoevsky", description: "A good book.", format: "Paperback", isbn: 9780679734529, cover_url: "www.google.com", price: 12.99, stock: 2}
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
    `, [product.title, product.description, product.author, , product.format, product.isbn, product.cover_url, product.price, product.stock]);
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


