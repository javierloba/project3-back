const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
//const Service = require('../models/Service.model);
//const Reserve = require('../models/Reserve.model);

//Create Service
router.post('/create-service', async (req, res, next) => {
    const {name, image, description, price} = req.body;
    
    if(!name || !description || !image || !price){
        return
    }
    Service.create({
        name,
        image,
        description,
        price
    })
    
})


