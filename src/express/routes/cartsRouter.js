const express = require('express');
const cartsRouter = express.Router();
const { getCart, addItemToCart, changeQuantity, deleteItemFromCart } = require('../db/cartsMethods');
const { requireUser } = require('./utils');


cartsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

cartsRouter.get('/cart/user/:userID', requireUser, async (req, res, next) => {
  const {userID} = req.params
  try {
    const cart = await getCart(userID)
    res.send(cart);
  } catch (error) {
    console.error(error);
    next({name: 'CartError', 
    message: "Can't get Cart for User"})
  }
});

cartsRouter.post('/cart/products', requireUser, async (req, res, next) => {
  const {productID, userID, quantity} = req.body;
  try {
    const cart = await addItemToCart(productID, userID, quantity)
    res.send(cart);
  } catch (error) {
    console.error(error);
    next({name: 'AddingToCartError', 
    message: "Couldn't Add Item"})
  }
});

cartsRouter.patch('/cart/products/:productID', requireUser, async (req, res, next) =>{
  const {cartID, quantity} = req.body
  try {
    const changedCart = await changeQuantity(cartID, quantity);
    res.send(changedCart);
  } catch (error) {
    console.error(error);
    next({name: 'EditCartError', 
    message: "Failed To Change Quantity"})
  }
})

cartsRouter.delete('/cart/products/:productID', requireUser, async (req, res, next) => {
  const {cartID, productID} = req.body;
  try {
    await deleteItemFromCart(cartID, productID)

  } catch (error) {
    console.error(error);
    next({name: 'DeleteCartItemError', 
    message: "Failed To Remove Item From Cart"})
  }
})

module.exports = cartsRouter;