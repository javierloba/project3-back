const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker.model");
const { checkRole } = require("../middlewares/index");

// ==== WORKERS ROUTES ==== //

//Create worker ------ OK
router.post("/createWorker", checkRole('Admin'), (req, res, next) => {
    const {
    name,
    surname,
    email,
    password,
    phone_number,
    role,
    } = req.body;

    if (password.length < 3) {
    return res
        .status(400)
        .json({
        message: "Please make your password at least 3 characters long",
        });
    }

    if(
    !name ||
    !surname ||
    !email ||
    !password ||
    !phone_number ||
    !role
    ) {
    return res
        .status(400)
        .json({ message: "Please fill all the fields in the form" });
    }

    Worker.findOne({ email }).then((worker) => {
    if (worker) {
        return res
        .status(400)
        .json({ message: "Worker already exists. Please change the email"})
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    Worker.create({
        name,
        surname,
        email,
        password: hashPass,
        phone_number,
        role,
    })
    .then((newWorker) => res.status(200).json(newWorker))
    .catch(err => res.status(500).json(err))
    })
})

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