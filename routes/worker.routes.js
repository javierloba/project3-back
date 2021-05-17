const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker.model");
const { checkRole } = require("../middlewares/index");

// ==== WORKERS ROUTES ==== //

  //Show all workers -------- OK
router.get("/workers", checkRole("Admin"), (req, res, next) => {
    Worker.find({})
        .then((workers) => res.status(200).json(workers))
        .catch((err) => res.status(500).json(err));
});

  //Show worker
router.get("/worker/:id", checkRole("Admin"), (req, res, next) => {
    const { id } = req.params;
    Worker.findById(id)
    .then((worker) => res.status(200).json(worker))
    .catch((err) => res.status(500).json(err));
});

  //EDIT WORKER ---------- OK
router.put("/editWorker/:id", checkRole('Admin'),(req, res, next) => {
    const { id } = req.params
    Worker.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json(err));
});

  //DELETE WORKER----------- OK
router.delete("/deleteWorker/:id", checkRole('Admin'),(req, res, next) => {
    const { id } = req.params;
    Worker.findOneAndRemove({_id: id})
    .then(()=> res.status(200).json({ message: `Worker ${id} deleted from Database`}))
    .catch((err) => res.status(500).json(err));
})

module.exports = router;