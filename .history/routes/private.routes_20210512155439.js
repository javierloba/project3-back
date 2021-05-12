const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
//const Service = require('../models/Service.model);
//const Reserve = require('../models/Reserve.model);

//Create Service
router.post('/create-service', async (req, res, next) => {
    const {name, image, description, price} = req.body;
    
    if(!name || !description || !image || !price){
        return res.status(400).json({ message: "All fields are required"})
    }
    
    Service.findOne({ name }).then((service) => {
        if (user) {
            return res
                .status(400)
                .json({ message: "Service already exists."})
        }
        
        Service.create({ name, description, image, price
        })
            .then((newService) => {

            })
    })
    
})


