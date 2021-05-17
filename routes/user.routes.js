const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { checkRole } = require("../middlewares/index");

// ==== USER ROUTHES ==== //

//Show all users ------- OK
router.get("/clients",  (req, res, next) => {
    User.find({})
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json(err));
});

  // Show user
router.get("/client/:id", checkRole("Admin", "Worker"), (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then((client) => res.status(200).json(client))
        .catch((err) => res.status(500).json(err));
});

  //EDIT USER ---------- OK
router.put("/editClient/:id", (req, res, next) => {
    console.log(req.params)
    const { id } = req.params
    User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err));
});

  //DELETE USER ------ OK
router.delete("/deleteClient/:id", checkRole('Admin'), (req, res, next) => {
    const { id } = req.params;
    User.findOneAndRemove({_id: id})
    .then(()=> res.status(200).json({ message: `User ${id} deleted from Database`}))
    .catch((err) => res.status(500).json(err));
})

module.exports = router;