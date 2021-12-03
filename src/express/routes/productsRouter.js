const express = require('express');
const productsRouter = express.Router();
const {requireUser} = require('./utils');
const {getAllProducts, 
        getProductByID, 
        getProductByTitle, 
        getProductByAuthor, 
        getProductByFormat, 
        getProductByISBN,
        getProductByGenre} = require('../db/productsMethods')

productsRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
    next();
});

productsRouter.get('/', async (req, res) => {

    try {
        const products = await getAllProducts()
        res.send(
            products
        );
    } catch (error) {
        console.error(error)
    } 
});

productsRouter.get('/:productID', async (req, res) => {

    try {
        const {productID} = req.params;
        const product = await getProductByID(productID)
        res.send(
            product
        );
    } catch (error) {
        console.error(error)
    }
});

productsRouter.get('/:title', async (req, res) => {

    try {
        const {title} = req.params;
        const product = await getProductByTitle(title)
        res.send(
            product
        );
    } catch (error) {
        console.error(error)
    }
});

productsRouter.get('/:author', async (req, res) => {

    try {
        const {author} = req.params;
        const product = await getProductByAuthor(author)
        res.send(
            product
        );
    } catch (error) {
        console.error(error)
    }
});

productsRouter.get('/:format', async (req, res) => {

    try {
        const {format} = req.params;
        const product = await getProductByFormat(format)
        res.send(
            product
        );
    } catch (error) {
        console.error(error)
    }
});

productsRouter.get('/:isbn', async (req, res) => {

    try {
        const {isbn} = req.params;
        const product = await getProductByISBN(isbn)
        res.send(
            product
        );
    } catch (error) {
        console.error(error)
    }
});

productsRouter.get('/:genreID', async (req, res) => {

    try {
        const {genreID} = req.params;
        const product = await getProductByGenre(genreID)
        res.send(
            product
        );
    } catch (error) {
        console.error(error)
    }
});




module.exports = productsRouter;