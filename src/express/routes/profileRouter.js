const express = require("express");
const { getAddressesByUserID, updateAddress, addNewAddress } = require("../db/profileMethods");
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

profileRouter.post('/address', requireUser, async (req, res, next) => {
  const {id} = req.user;
  const {first_name, last_name, street, city, state, zip} = req.body;

  try {
    const newAddress = await addNewAddress(id, first_name, last_name, street, city, state, zip)
    res.send(newAddress)
  } catch (error) {
    console.error(error)
    next({
      name: "AddingAddressError",
      message: "Failed to Add Address"
    })
  }
})

module.exports = profileRouter;