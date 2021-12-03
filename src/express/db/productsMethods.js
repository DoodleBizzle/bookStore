const { client } = require(".");

async function getAllProducts() {
    try {
        const {rows} = await client.query(`
        SELECT *
        FROM products;
    `)
    return rows
    } catch (error) {
        console.error(error)
    }
}


async function getProductByID(productID) {
    try {
        const {rows: [product]} = await client.query(`
        SELECT *
        FROM products
        WHERE id = ($1);
    `, [productID])
    return product
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllProducts,
    getProductByID
}