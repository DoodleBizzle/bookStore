const express = require("express");
const { getAddressesByUserID, updateAddress } = require("../db/profileMethods");
const profileRouter = express.Router();
const { requireUser } = require("./utils");


profileRouter.use((req, res, next) => {
  console.log("A request is being made to /profile");
  next();
});

profileRouter.get("/", requireUser ,async (req, res, next) => {
  const {id} = req.user;
  
  try {
    const address = await getAddressesByUserID(id);
    res.send(address)
    
  } catch (error) {
    console.error(error)
    next({
      name: "RetrievingAddressError",
      message: "Failed To Get Address",
    });
  }
});

profileRouter.patch("/edit", requireUser, async (req, res, next) => {
  const {id} = req.user;
  const {first_name, last_name, street, city, state, zip} = req.body;
  console.log("in profileRouter",req.body, id, first_name)
  try {
    const updatedAddress = await updateAddress(id, first_name, last_name, street, city, state, zip);
    res.send(updatedAddress)

  } catch (error) {
    console.error(error)
    next({
      name: "UpdatingAddressError",
      message: "Failed To Update Address",
    });
  }
})

module.exports = profileRouter;