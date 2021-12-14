const express = require("express");
const cartsRouter = express.Router();
const {
  getCart,
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  deleteCart
} = require("../db/cartsMethods");
const { requireUser } = require("./utils");

cartsRouter.use((req, res, next) => {
  console.log("A request is being made to /carts");
  next();
});

cartsRouter.get("/user/:userID", requireUser, async (req, res, next) => {
  const { userID } = req.params;
  try {
    const cart = await getCart(userID);

    if (!cart) {
      res.send([]);
    } else {
      res.send(cart);
    }
  } catch (error) {
    console.error(error);
    next({ name: "CartError", message: "Can't get Cart for User" });
  }
});

cartsRouter.post("/products", requireUser, async (req, res, next) => {
  const { userID, productID, quantity } = req.body;
  try {
    const cart = await addItemToCart(productID, userID, quantity);
    res.send(cart);
  } catch (error) {
    console.error(error);
    next({ name: "AddingToCartError", message: "Couldn't Add Item" });
  }
});

cartsRouter.patch("/products/:productID", requireUser, async (req, res, next) => {
    const { productID } = req.params;
    const { userID, quantity } = req.body;
    try {
      const changedCart = await changeQuantity(productID, userID, quantity);
      res.send(changedCart);
    } catch (error) {
      console.error(error);
      next({ name: "EditCartError", message: "Failed To Change Quantity" });
    }
  }
);

cartsRouter.delete("/products/:productID", requireUser, async (req, res, next) => {
    const { productID } = req.params;
    const { userID } = req.body;

    try {
      const deleted = await deleteItemFromCart(userID, productID);
      if (deleted) {
        res.send(deleted);
      } else {
        next({ name: "NoItemError", message: "No item" });
      }
    } catch (error) {
      console.error(error);
      next({
        name: "DeleteCartItemError",
        message: "Failed To Remove Item From Cart",
      });
    }
  }
);

cartsRouter.delete('/user/:userID/checkout', requireUser, async (req, res, next) => {
  const {userID} = req.params;

  try {
    const deletedCart = await deleteCart(userID);
    if (deletedCart) {
      res.send(deletedCart);
    } else {
      next({ name: "NoCartError", message: "No Items" });
    }
  } catch (error) {
    console.error(error);
    next({
      name: "DeleteCartError",
      message: "Failed To Remove Delete Cart",
    })
  }
})

module.exports = cartsRouter;
