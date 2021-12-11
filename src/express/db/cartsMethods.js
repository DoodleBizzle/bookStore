const { client } = require(".");


async function getCart (userID){
  const { rows} = await client.query(`
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
    RETURNING *
  `,[productID, userID, quantity])
  return cart;
}

async function changeQuantity(cartID, quantity){
  const { rows: [cart] } = await client.query(`
    UPDATE carts
    SET quantity = $1
    WHERE id = $2
    RETURNING *
  `,[quantity, cartID])
  return cart;
}

async function deleteItemFromCart(cartID, productID){
  const {rows: [cart] } = await client.query(`
    DELETE 
    FROM carts
    WHERE carts.id = $1 AND carts."productID" = $2
    RETURNING *
  `, [cartID, productID]);
  return cart
}

module.exports = {
  getCart,
  addItemToCart,
  changeQuantity,
  deleteItemFromCart
  }