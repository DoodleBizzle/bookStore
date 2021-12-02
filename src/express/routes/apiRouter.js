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

// set up error handler here

module.exports = apiRouter;
