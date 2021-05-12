const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
//const Service = require('../models/Service.model);
//const Reserve = require('../models/Reserve.model);

//CREATE SERVICE
router.post("/create-service", async (req, res, next) => {
  const { name, image, description, price } = req.body;

  if (!name || !description || !image || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Service.findOne({ name }).then((service) => {
    if (user) {
      return res.status(400).json({ message: "Service already exists." });
    }

    try {
      const service = await Service.create({ name, description, image, price });
      return res.status(200).json(service);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
});

//EDIT SERVICE
router.put("/services/:id", (req, res, next) => {
    const { id } = req.params;
    Service.findOneAndUpdate({_id: id, service: req.service.id }, req.body, { new: true })
    .then(todo => res.status(200).json(todo))
    .catch(err => res.status(500).json(err))
})


/
router.delete("/services/:id", (req, res, next) => {
    const { id } = req.params;
    Service.findOneAndUpdate({ _id: id, service: req.service.id}, req.body, { new: true })
})
module.exports = router;