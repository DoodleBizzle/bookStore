const express = require('express');
const productsRouter = express.Router();
const {requireUser} = require('./utils');
const {getAllProducts} = require('../db/productsMethods')

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







module.exports = productsRouter;