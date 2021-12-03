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

async function getProductByTitle(productTitle) {
    try {
        const {rows: [product]} = await client.query(`
        SELECT *
        FROM products
        WHERE title = ($1);
    `, [productTitle])
    return product
    } catch (error) {
        console.error(error)
    }
}

async function getProductByAuthor(productAuthor) {
    try {
        const {rows: [product]} = await client.query(`
        SELECT *
        FROM products
        WHERE author = ($1);
    `, [productAuthor])
    return product
    } catch (error) {
        console.error(error)
    }
}

async function getProductByFormat(productFormat) {
    try {
        const {rows: [product]} = await client.query(`
        SELECT *
        FROM products
        WHERE format = ($1);
    `, [productFormat])
    return product
    } catch (error) {
        console.error(error)
    }
}

async function getProductByISBN(productISBN) {
    try {
        const {rows: [product]} = await client.query(`
        SELECT *
        FROM products
        WHERE isbn = ($1);
    `, [productISBN])
    return product
    } catch (error) {
        console.error(error)
    }
}

async function getProductByGenre(genreID) {
    try {
        const {rows: [product]} = await client.query(`
        SELECT *
        FROM products
        WHERE "genreID" = ($1);
    `, [genreID])
    return product
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllProducts,
    getProductByID,
    getProductByTitle,
    getProductByAuthor,
    getProductByFormat,
    getProductByISBN,
    getProductByGenre
}