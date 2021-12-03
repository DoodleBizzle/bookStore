const express = require('express');
const cartsRouter = express.Router();


cartsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

cartsRouter.get('/cart', async (req, res) => {
  const {userId} = req.body;
  try {
    
  } catch (error) {
    console.error(error);
  }
})