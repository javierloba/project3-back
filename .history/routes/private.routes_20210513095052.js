const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
//const Service = require('../models/Service.model);
//const Reserve = require('../models/Reserve.model);

//SHOW ALL CLIENTS
router.get("/clients", (req, res, next) => {
    User.find({})
    .then(services => res.status(200).json(services))
    .catch(err => res.status(500).json(err))
})

//CREATE SERVICE
router.post('/')

//EDIT SERVICE
router.put("/services/:id", (req, res, next) => {
    const { id } = req.params;
    Service.findOneAndUpdate({_id: id, service: req.service.id }, req.body, { new: true })
    .then(todo => res.status(200).json(todo))
    .catch(err => res.status(500).json(err))
})

//DELETE SERVICE
router.delete("/services/:id", (req, res, next) => {
    const { id } = req.params;
    Service.findOneAndUpdate({ _id: id, service: req.service.id}, req.body, { new: true })
})



module.exports = router;