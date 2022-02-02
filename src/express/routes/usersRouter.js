const express = require("express");
const usersRouter = express.Router();
const { requireUser } = require("./utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../db/usersMethods");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

usersRouter.post("/register", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const checkingUser = await getUserByEmail(email);
    if (checkingUser) {
      next({
        name: "UserExistsError",
        message: "A user by that email already exists",
      });
      return;
    }

    const user = await createUser({ email, password });

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Thank you for signing up!",
      token,
    });
  } catch (error) {
    console.error(error);
    next({ name: "UserCreateError", message: "Can't create user right now." });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please provide both a email and password",
    });
    return;
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "Email or Password is incorrect",
      });
    }

    const hashed = user.password;
    const matched = await bcrypt.compare(password, hashed);

    if (matched) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      delete user.password;
      res.send({ user, token, message: "You're logged in!" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRouter.get("/authenticate", requireUser, (req, res, next) => {
  res.send({
    success: true,
    user: req.user,
  });
});

module.exports = usersRouter;
