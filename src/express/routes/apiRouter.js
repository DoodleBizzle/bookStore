const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken')
const { getUserById } = require('../db/usersMethods')

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

// use your sub-routers here

const usersRouter = require('./usersRouter');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./productsRouter');
apiRouter.use('/products', productsRouter)

const cartsRouter = require('./cartsRouter');
apiRouter.use('/cart', cartsRouter);

const genresRouter = require('./genresRouter');

apiRouter.use('/genres', genresRouter);

apiRouter.use ((req, res, next) => { 
  res.status(404).send({name: 'api error', message: 'URL does not exist' })
});

// set up error handler here
apiRouter.use((error, req, res, next)=>{
  console.error(error)
  res.send({name: error.name, message: error.message})
})

module.exports = apiRouter;
