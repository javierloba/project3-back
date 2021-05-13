const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Service = require("../models/Service.model");
//const Reserve = require('../models/Reserve.model);

//SHOW ALL CLIENTS
router.get("/clients", (req, res, next) => {
  User.find({})
    .then((services) => res.status(200).json(services))
    .catch((err) => res.status(500).json(err));
});

//CREATE RESERVE
router.get("/createReserve", async (req, res, next) => {
  try {
    const { name, image, description, price } = req.body;
    if (!name || !description || !image || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newService = await Service.create({ name, description, image, price })
    const userId = req.user.id;
    const updatedUser = await User.findOneAndUpdate({id: userId}, { $push: { service_reserve: newService._id } }, {new: true});
    const workerId = req.params.id;
    const updatedWorker = await Worker.findOneAndUpdate({_id: workerId}, { $push: { todo_services: newService._id } }, {new: true});
    return res.status(200).json(newService, updatedUser, updatedWorker)
  } catch(error) { return res.status(500).json(error)}
})

//CREATE SERVICE
router.post("/createService", (req, res, next) => {
  const { name, image, description, duration, price } = req.body;

  if (!name || !description || !image || !price || !duration) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Service.findOne({ name }).then((service) => {
    if (service) {
      return res.status(400).json({ message: "Service already exists." });
    }

    Service.create({ name, description, image, price, duration })
    .then(service => res.status(200).json(service))
    .catch(err => res.status(500).json(err));
  });
});

//EDIT SERVICE
router.put("/services/:id", (req, res, next) => {
  const { id } = req.params;
  Service.findOneAndUpdate({ _id: id, service: req.service.id }, req.body, {
    new: true,
  })
    .then((service) => res.status(200).json(service))
    .catch((err) => res.status(500).json(err));
});

//DELETE SERVICE
router.delete("/services/:id", (req, res, next) => {
  const { id } = req.params;
  Service.findOneRemove({id})
    .then(() => res.status(200).json({ message: `Service ${id} deleted 🗑` }))
    .catch((err) => res.status(500).json(err));
});

//Create reserve


module.exports = router;
