const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
//const Service = require('../models/Service.model);
//const Reserve = require('../models/Reserve.model);

// Bcrypt config to encrypt passwords
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;



//EDIT USER
router.put('/editClient', isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { name, surname, birthdate, phone_number, email, client_antiquity, password } = req.body;
    
    User.

} )