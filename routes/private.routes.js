const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Worker = require("../models/Worker.model");
const Service = require("../models/Service.model");
const Reserve = require("../models/Reserve.model");
const { checkRole } = require("../middlewares/index");

// ==== USER ROUTHES ==== //

//Show all users ------- OK
router.get("/clients", checkRole("Admin", "Worker"), (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json(err));
});

router.get("/client/:id", checkRole("Admin", "Worker"), (req, res, next) => {
  const { id } = req.params;
  Client.findById(id)
    .then((client) => res.status(200).json(client))
    .catch((err) => res.status(500).json(err));
});

// ==== WORKERS ROUTHES ==== //

//Show all workers -------- OK
router.get("/workers", checkRole("Admin"), (req, res, next) => {
  Worker.find({})
    .then((workers) => res.status(200).json(workers))
    .catch((err) => res.status(500).json(err));
});

router.get("/worker/:id", checkRole("Admin"), (req, res, next) => {
  const { id } = req.params;
  Worker.findById(id)
    .then((worker) => res.status(200).json(worker))
    .catch((err) => res.status(500).json(err));
});
// ==== SERVICES ROUTHES ==== //

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

//Edit service ----------- OK
router.put("/services/:id", checkRole("Admin", "Worker"), (req, res, next) => {
  const { id } = req.params;
  Service.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
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

// ==== RESERVATIONS ROUTHES ==== //

// Create reserve -------- OK
router.post("/create-reserve", async (req, res, next) => {
  try {
    const { reservation_date, status, worker_id, service_id } = req.body;
    if (!reservation_date) {
      return res.status(400).json({ message: "Date required" });
    }
    const userId = req.user._id;

    const newReserve = await Reserve.create({
      reservation_date,
      status,
      service_id,
      assigned_worker: worker_id,
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { service_reserve: newReserve._id } },
      { new: true }
    );

    const updatedWorker = await Worker.findOneAndUpdate(
      { _id: worker_id },
      { $push: { todo_services: newReserve._id } },
      { new: true }
    );

    return res.status(200).json(newReserve, updatedUser, updatedWorker);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Show all reserves -------- OK
router.get("/reserves", (req, res, next) => {
  Reserve.find({})
    .populate("service_id")
    .then((reserves) => res.status(200).json(reserves))
    .catch((err) => res.status(500).json(err));
});

//Show resrve detail
router.get("/reserve/:id", (req, res, next) => {
  const { id } = req.params;
  Reserve.findById(id)
    .then((service) => res.status(200).json(service))
    .catch((err) => res.status(500).json(err));
});

//Edit reserve ----------- OK
router.put("/reserve/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id, req.body);
  Reserve.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
    .then((reserve) => res.status(200).json(reserve))
    .catch((err) => res.status(500).json(err));
});

// Delete reserve -------- OK
router.delete("/reserve/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reserve = await Reserve.findById(id);
    const worker_id = reserve.assigned_worker;
    const deletedReserve = await Reserve.findOneAndRemove({ _id: id });
    const userId = req.user.id;
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $pull: { service_reserve: deletedReserve._id } },
      { new: true }
    );

    const updatedWorker = await Worker.findOneAndUpdate(
      { _id: worker_id },
      { $pull: { todo_services: deletedReserve._id } },
      { new: true }
    );

    return res.status(200).json(deletedReserve, updatedUser, updatedWorker);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
