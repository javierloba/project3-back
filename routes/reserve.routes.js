const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Worker = require("../models/Worker.model");
const Reserve = require("../models/Reserve.model");

// ==== RESERVATIONS ROUTES ==== //

// Create reserve -------- OK
router.post("/create-reserve", async (req, res, next) => {
    try {
    const { reservation_date, status, worker_id, user_id, service_id, service_name } = req.body;
    console.log(req.body)
    if (!reservation_date) {
        return res.status(400).json({ message: "Date required" });
    }
    const userId = req.user._id;

    const newReserve = await Reserve.create({
        reservation_date,
        status,
        service_id,
        assigned_worker: worker_id,
        assigned_client: user_id,
        service_name
    });
console.log(newReserve)
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { service_reserve: newReserve._id } },
        { new: true }
    );
console.log(updatedUser)
    const updatedWorker = await Worker.findOneAndUpdate(
        { _id: worker_id },
        { $push: { todo_services: newReserve._id } },
        { new: true }
    );
    console.log(updatedWorker)
    return res.status(200).json(newReserve, updatedUser, updatedWorker);
    } catch (error) {
    return res.status(500).json(error);
    }
});

// Show all reserves -------- OK
router.get("/reserves", (req, res, next) => {
    Reserve.find({})
    .populate("service_id")
    .populate("assigned_worker")
    .populate("assigned_client")
    .populate("worker_id")
    .then((reserves) => res.status(200).json(reserves))
    .catch((err) => res.status(500).json(err));
});

//Show resrve detail
router.get("/reserve/:id", (req, res, next) => {
    const { id } = req.params;
    Reserve.findById(id)
    .populate("assigned_worker")
    .populate("assigned_client")
        .then((service) => res.status(200).json(service))
        .catch((err) => res.status(500).json(err));
});

//Edit reserve ----------- OK
router.put("/reserve/:id", (req, res, next) => {
    const { id } = req.params;
    console.log("testlog", id, req.body);
    Reserve.findOneAndUpdate({ _id: id }, { reservation_date: req.body.reservation_date }, { new: true })
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