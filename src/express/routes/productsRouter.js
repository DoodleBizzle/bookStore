const express = require('express');
const productsRouter = express.Router();
const {getAllProducts, getProductsByID,} = require('../db/productsMethods')

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
        next({name: 'GetProductError', message: "Failed to Retrieve Products :/"})
    } 
});

productsRouter.get('/:productID', async (req, res) => {

    try {
        const {productID} = req.params;
        const products = await getProductsByID(productID)
        res.send(
            products
        );
    } catch (error) {
        console.error(error)
        next({name: 'GetProductByIDError', message: `Failed to Retrieve Specific Product :/`})
    }
});

module.exports = productsRouter;