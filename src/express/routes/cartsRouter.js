const express = require('express');
const cartsRouter = express.Router();
const { getCart, addItemToCart, changeQuantity, deleteItemFromCart } = require('../db/cartsMethods');
const { requireUser } = require('./utils');


cartsRouter.use((req, res, next) => {
  console.log("A request is being made to /carts");
  next();
});

cartsRouter.get('/user/:userID', requireUser, async (req, res, next) => {
  const {userID} = req.params;
  try {
    const cart = await getCart(userID)

    if(!cart){
      res.send([]);
    }
    else {
      res.send(cart);
    };
  } catch (error) {
    console.error(error);
    next({name: 'CartError', 
    message: "Can't get Cart for User"})
  }
});

cartsRouter.post('/products', requireUser, async (req, res, next) => {
<<<<<<< HEAD
  const {productID, userID, quantity} = req.body;
=======
  const {userID, productID, quantity} = req.body;
  
>>>>>>> 050e5a1e53087a55c7d6837e53e2394b4bb16420
  try {
    const cart = await addItemToCart(productID, userID, quantity)
    res.send(cart);
  } catch (error) {
    console.error(error);
    next({name: 'AddingToCartError', 
    message: "Couldn't Add Item"})
  }
});

cartsRouter.patch('/products/:productID', requireUser, async (req, res, next) =>{
  const {productID} = req.params
  const {userID, quantity} = req.body
  try {
    const changedCart = await changeQuantity(productID, userID, quantity);
    res.send(changedCart);
  } catch (error) {
    console.error(error);
    next({name: 'EditCartError', 
    message: "Failed To Change Quantity"})
  }
 }
)

cartsRouter.delete('/products/:productID', requireUser, async (req, res, next) => {
  const { productID } = req.params;
  const {userID} = req.body
  
  try {
    const deleted = await deleteItemFromCart(userID, productID)
    if(deleted){
      res.send(deleted)
    }else {
      next({name: 'NoItemError', 
      message: "No item"})
    }
  } catch (error) {
    console.error(error);
    next({name: 'DeleteCartItemError', 
    message: "Failed To Remove Item From Cart"})
  }
})

module.exports = cartsRouter;