const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
//const Service = require('../models/Service.model);
//const Reserve = require('../models/Reserve.model);

//SHOW ALL SERVICES
router.get("/services", (req, res, next) => {
    Service.find({})
    .then(services => res.status(200).json(todos))
    .catch(err => res.status(500).json(err))
});

//CREATE RESERVE
router.post("/create-reserve/:id",async (req, res, next) => {
    const service_id = req.params.id;
    const user_id = req.user.id
    
    const user_email = req.user.email

    User.findOneAndUpdate({id: user_id}, {$push: {}})
}) 

module.exports = router;