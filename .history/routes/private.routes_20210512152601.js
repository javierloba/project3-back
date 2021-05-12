const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
//const Service = require('../models/Service.model);
//const Reserve = require('../models/Reserve.model);

// Bcrypt config to encrypt passwords
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;



//EDIT USER
router.put('/editClient'(req, res, next) => {

    User.updateOne(id, { $set: {name, surname, birthdate, phone_number}})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err))
})