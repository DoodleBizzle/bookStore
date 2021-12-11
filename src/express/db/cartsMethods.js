const { client } = require(".");


async function getCart (userID){
<<<<<<< HEAD
  const { rows} = await client.query(`
=======
  const { rows } = await client.query(`
>>>>>>> 050e5a1e53087a55c7d6837e53e2394b4bb16420
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

<<<<<<< HEAD
async function changeQuantity(cartID, quantity){
=======
async function changeQuantity(productID, userID, quantity){
>>>>>>> 050e5a1e53087a55c7d6837e53e2394b4bb16420
  const { rows: [cart] } = await client.query(`
    UPDATE carts
    SET quantity = $1
    WHERE "userID" = $2 AND "productID" = $3
    RETURNING *;
  `,[quantity, userID, productID])
  return cart;
}

<<<<<<< HEAD
async function deleteItemFromCart(cartID, productID){
=======
async function deleteItemFromCart(userID, productID){
>>>>>>> 050e5a1e53087a55c7d6837e53e2394b4bb16420
  const {rows: [cart] } = await client.query(`
    DELETE 
    FROM carts
    WHERE carts."userID" = $1 AND carts."productID" = $2
    RETURNING *;
  `, [userID, productID]);
  return cart
}

module.exports = {
  getCart,
  addItemToCart,
  changeQuantity,
  deleteItemFromCart
  }