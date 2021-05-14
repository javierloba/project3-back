const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Service = require("../models/Service.model");
const Reserve = require('../models/Reserve.model');

//SHOW ALL SERVICES -------------- OK
router.get("/services", (req, res, next) => {
    Service.find({})
    .then((services) => res.status(200).json(services))
    .catch(err => res.status(500).json(err))
});

//Show service detail
router.get("/service/:id", (req, res, next) => {
    const { id } = req.params;
    Service.findById(id)
    .then((service) => res.status(200).json(service))
    .catch((err) => res.status(500).json(err))
  })
module.exports = router;