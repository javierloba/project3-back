const express = require("express");
const router = express.Router();
const Service = require("../models/Service.model");
const { checkRole } = require("../middlewares/index");

// ==== SERVICES ROUTES ==== //

//Create service ------------ OK
router.post("/createService", checkRole("Admin"), (req, res, next) => {
    const { name, image, description, duration, price } = req.body;
    if (!name || !description || !image || !price || !duration) {
        return res.status(400).json({ message: "All fields are required" });
}

    if (!name || !description || !image || !price) {
        return res.status(400).json({ message: "All fields are required" });
}

    Service.create({ name, description, image, price, duration })
        .then((service) => res.status(200).json(service))
        .catch((err) => res.status(500).json(err));
});

//Show all services -------------- OK
router.get("/services", (req, res, next) => {
    Service.find({})
    .then((services) => res.status(200).json(services))
    .catch((err) => res.status(500).json(err));
});

//Show service detail
router.get("/service/:id", (req, res, next) => {
    const { id } = req.params;
    Service.findById(id)
        .then((service) => res.status(200).json(service))
        .catch((err) => res.status(500).json(err));
});

//Edit service ----------- OK
router.put("/services/:id", (req, res, next) => {
    const { id } = req.params;
    console.log(req.body)
    Service.findOneAndUpdate({ _id: id }, { name: req.body.name}, { new: true })
        .then((service) => res.status(200).json(service))
        .catch((err) => res.status(500).json(err));
});

//Delete service ------------- OK
router.delete("/services/:id/delete", checkRole("Admin"), (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    Service.findOneAndRemove({ _id: id })
        .then(() => res.status(200).json({ message: `Service ${id} deleted 🗑` }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;