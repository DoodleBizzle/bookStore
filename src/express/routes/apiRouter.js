const apiRouter = require('express').Router();

// GET /api
// This is a sample route
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

// use your sub-routers here

const usersRouter = require('./usersRouter');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./productsRouter');
apiRouter.use('./products', productsRouter)

const cartsRouter = require('./cartsRouter');
apiRouter.use('/cart', cartsRouter);

// set up error handler here
apiRouter.use((error, req, res, next)=>{
  console.error(error)
  res.send({name: error.name, message: error.message})
})

module.exports = apiRouter;
