const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
//const Service = require('../models/Service.model);
//const Reserve = require('../models/Reserve.model);


const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

//EDIT CLIENT
router.post('/editClient' )