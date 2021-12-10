const { client } = require(".");

async function getAllProducts() {
    const {rows} = await client.query(`
        SELECT *
        FROM products;
    `)
    return rows
}

async function getProductsByID(productID) {
    const {rows: [products]} = await client.query(`
        SELECT *
        FROM products
        WHERE id = ($1);
    `, [productID])
    return products
}

async function getProductsByTitle(productTitle) {
    const {rows: [products]} = await client.query(`
        SELECT *
        FROM products
        WHERE title = ($1);
    `, [productTitle])
    return products
}

async function getProductsByAuthor(productAuthor) {
        const {rows: [products]} = await client.query(`
        SELECT *
        FROM products
        WHERE author = ($1);
    `, [productAuthor])
    return products
}

async function getProductsByFormat(productFormat) {
    const {rows: [products]} = await client.query(`
        SELECT *
        FROM products
        WHERE format = ($1);
    `, [productFormat])
    return products
}

async function getProductsByISBN(productISBN) {
    const {rows: [products]} = await client.query(`
        SELECT *
        FROM products
        WHERE isbn = ($1);
    `, [productISBN])
    return products
}

async function getProductsByGenre(genreID) {
    const {rows: [products]} = await client.query(`
        SELECT *
        FROM products
        WHERE "genreID" = ($1);
    `, [genreID])
    return products
}

module.exports = {
    getAllProducts,
    getProductsByID,
    getProductsByTitle,
    getProductsByAuthor,
    getProductsByFormat,
    getProductsByISBN,
    getProductsByGenre
}