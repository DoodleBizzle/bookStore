const express = require('express');
const searchRouter = express.Router();
const {getProductsBySearch} = require('../db/searchMethods')

searchRouter.use((req, res, next) => {
  console.log("A request is being made to /search");
  next();
});

searchRouter.get('/', async (req, res, next) => {
  const {term} = req.query;

  try {
    const products = await getProductsBySearch(term)
    res.send(products)
  } catch (error) {
    console.error(error)
    next({
      name: 'SearchError',
      message: 'No Products Match Search'
    })
  }
})

module.exports = searchRouter;