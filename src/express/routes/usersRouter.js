const express = require('express');
const usersRouter = express.Router();
const {requireUser} = require('./utils');
const jwt = require('jsonwebtoken');
const {createUser, getUserByEmail} = require('../db/usersMethods')

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

usersRouter.get('/authenticate', requireUser, async (req, res) => {
  res.send({
    success: true,
    user: req.user
  });
});

usersRouter.post('/register', async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const checkingUser = await getUserByEmail(email)
    if(checkingUser){
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
      return;
    }

    const user = await createUser({email, password})

    const token = jwt.sign({
      id: user.id,
      email
    }, process.env.JWT_SECRET,{
      expiresIn: '1w'
    });

    res.send({
      message: "thank you for signing up",
      token
    });
  } catch (error) {
    console.error(error);
    next({name: 'UserCreateError', 
    message: "Can't create user right now."})
  }
});

usersRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please provide both a username and password"
    });
  }

  try {
    const user = await getUserByEmail(email);

    if (user && user.password == password) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      delete user.password
      res.send({ user, token, message: "you're logged in!" });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or Password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
})

module.exports = usersRouter;