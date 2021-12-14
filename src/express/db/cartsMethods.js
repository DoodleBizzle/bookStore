const { client } = require(".");


async function getCart (userID){
  const { rows } = await client.query(`
    SELECT *
    FROM carts
    JOIN users
    ON carts."userID" = users.id
    JOIN products 
    ON carts."productID" = products.id
    WHERE users.id = $1
  `,[userID])
  return rows;
}

async function addItemToCart ( productID, userID, quantity ) {
  const {rows: [cart]} = await client.query(`
    INSERT INTO carts("productID", "userID", quantity)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,[productID, userID, quantity])
  return cart;
}

async function changeQuantity(productID, userID, quantity){
  const { rows: [cart] } = await client.query(`
    UPDATE carts
    SET quantity = $1
    WHERE "userID" = $2 AND "productID" = $3
    RETURNING *;
  `,[quantity, userID, productID])
  return cart;
}

async function deleteItemFromCart(userID, productID){
  const {rows: [cart] } = await client.query(`
    DELETE 
    FROM carts
    WHERE carts."userID" = $1 AND carts."productID" = $2
    RETURNING *;
  `, [userID, productID]);
  return cart
}

async function deleteCart(userID){
  const {rows } = await client.query(`
    DELETE 
    FROM carts
    WHERE carts."userID" = $1
    RETURNING *;
  `, [userID]);
  return rows
}

module.exports = {
  getCart,
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  deleteCart
  }