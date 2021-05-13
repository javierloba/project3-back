const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Worker = require("../models/Worker.model")
const Service = require("../models/Service.model");
const Reserve = require('../models/Reserve.model');


// ==== USER ROUTHES ==== //

//Show all users ------- OK
router.get("/clients", (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json(err));
});


// ==== WORKERS ROUTHES ==== //

//Show all workers -------- OK
router.get("/workers", (req, res, next) => {
  Worker.find({})
    .then((workers) => res.status(200).json(workers))
    .catch((err) => res.status(500).json(err));
});


// ==== SERVICES ROUTHES ==== //

//Create service ------------ OK
router.post("/createService", (req, res, next) => {
  const { name, image, description, duration, price } = req.body;
  if (!name || !description || !image || !price || !duration) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!name || !description || !image || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Service.create({ name, description, image, price, duration })
  .then(service => res.status(200).json(service))
  .catch(err => res.status(500).json(err));
});

//Edit service ----------- OK
router.put("/services/:id", (req, res, next) => {
  const { id } = req.params;
  Service.findOneAndUpdate({ _id: id}, {...req.body}, { new: true })
  .then((service) => res.status(200).json(service))
  .catch((err) => res.status(500).json(err));
});

//Delete service ------------- OK
router.delete("/services/:id/delete", (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  Service.findOneAndRemove({_id: id})
  .then(() => res.status(200).json({ message: `Service ${id} deleted 🗑` }))
  .catch((err) => res.status(500).json(err));
});


// ==== RESERVATIONS ROUTHES ==== //

// Create reserve -------- OK
router.post("/create-reserve", async (req, res, next) => {
  try {
    const { reservation_date, status } = req.body;
    if (!reservation_date) {
      return res.status(400).json({ message: "Date required" });
    }
    const userId = "609d29da2c632c9dde9af977";
    const workerId = "609d29da2c632c9dde9af992";
   
    
    const newReserve = await Reserve.create({ reservation_date, status })
   
    
    const updatedUser = await User.findOneAndUpdate({_id: userId}, { $push: { service_reserve: newReserve._id } }, {new: true});
   
    
    
    const updatedWorker = await Worker.findOneAndUpdate({_id: workerId}, { $push: { todo_services: newReserve._id } }, {new: true});
    
    return res.status(200).json(newReserve, updatedUser, updatedWorker)
  } catch(error) { return res.status(500).json(error)}
})

// Show all reserves -------- OK

router.get("/reserves", (req, res, next) => {
  Reserve.find({})
    .then((reserves) => res.status(200).json(reserves))
    .catch((err) => res.status(500).json(err));
});

//Edit reserve ----------- PENDIENTE
router.put("/reserve/:id", (req, res, next) => {
  const { id } = req.params;
  Reserve.findOneAndUpdate({ _id: id}, {...req.body}, { new: true })
  .then((reserve) => res.status(200).json(reserve))
  .catch((err) => res.status(500).json(err));
});

// Delete reserve -------- PENDIENTE
router.delete("/reserve/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReserve = await Reserve.findOneAndRemove({ _id: id }) 
    const userId = req.user.id;
    const updatedUser = await User.findOneAndUpdate({id: userId}, { $pull: { service_reserve: deletedReserve._id } }, {new: true});

    const workerId = req.params.id;
    const updatedWorker = await Worker.findOneAndUpdate({_id: workerId}, { $pull: { todo_services: deletedReserve._id } }, {new: true});

    return res.status(200).json(deletedReserve, updatedUser, updatedWorker)
  } catch(error) { return res.status(500).json(error)}
})

module.exports = router;
