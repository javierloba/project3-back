const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
//const Service = require('../models/Service.model);
//const Reserve = require('../models/Reserve.model);

// Bcrypt config to encrypt passwords
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;



//EDIT USER
router.put('/editClient', (req, res, next) => {
    User.findOneAndUpdate({_id: req.user.id}, {...req.body}, {new: true})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err))
})