const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Worker = require("../models/Worker.model")
const Service = require("../models/Service.model");
const Reserve = require('../models/Reserve.model');

//SHOW ALL CLIENTS ------- OK
router.get("/clients", (req, res, next) => {
  User.find({})
    .then((services) => res.status(200).json(services))
    .catch((err) => res.status(500).json(err));
});

//SHOW ALL workers -------- OK
router.get("/workers", (req, res, next) => {
  Worker.find({})
    .then((services) => res.status(200).json(services))
    .catch((err) => res.status(500).json(err));
});

//CREATE RESERVE -------- OK
router.get("/create-reserve", async (req, res, next) => {
  try {

    const { reservation_date } = req.body;

    if (!reservation_date) {
      return res.status(400).json({ message: "Date required" });
    }

    const newReserve = await Reserve.create({ reservation_date })

    const userId = req.user.id;

    const updatedUser = await User.findOneAndUpdate({id: userId}, { $push: { service_reserve: newReserve._id } }, {new: true});

    const workerId = req.params.id;

    const updatedWorker = await Worker.findOneAndUpdate({_id: workerId}, { $push: { todo_services: newReserve._id } }, {new: true});

    return res.status(200).json(newReserve, updatedUser, updatedWorker)

  } catch(error) { return res.status(500).json(error)}
})

//CREATE SERVICE ------------ OK
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


//EDIT SERVICE ----------- OK
router.put("/services/:id", (req, res, next) => {
  const { id } = req.params;
  Service.findOneAndUpdate({ _id: id}, {...req.body}, { new: true })
    .then((service) => res.status(200).json(service))
    .catch((err) => res.status(500).json(err));
});

//DELETE SERVICE ------------- OK
router.delete("/services/:id", (req, res, next) => {
  const { id } = req.params;
  Service.findOneAndRemove({id})
    .then(() => res.status(200).json({ message: `Service ${id} deleted 🗑` }))
    .catch((err) => res.status(500).json(err));
});

//DELETE RESERVE 
router.delete("/reserve/:id/delete", async (req, res, next) => {
  try {

    const { id } = req.params;

    const deletedReserve = await Reserve.findOneAndRemove({ id })

    const userId = req.user.id;

    const updatedUser = await User.findOneAndUpdate({id: userId}, { $pull: { service_reserve: deletedReserve._id } }, {new: true});

    const workerId = req.params.id;

    const updatedWorker = await Worker.findOneAndUpdate({_id: workerId}, { $pull: { todo_services: deletedReserve._id } }, {new: true});

    return res.status(200).json(deletedReserve, updatedUser, updatedWorker)

  } catch(error) { return res.status(500).json(error)}
})

module.exports = router;
