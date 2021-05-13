const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User.model");
const Worker = require("../models/Worker.model")
const transporter = require('../configs/nodemailer.config');
const { isLoggedOut } = require('../middlewares')
const { isLoggedIn } = require('../middlewares')

// Bcrypt config to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

//CREATE WORKER ------ OK
router.post("/createWorker", (req, res, next) => {
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

//CREATE CLIENT -------- REVIEW
router.post("/createClient", (req, res, next) => {
  const {
    client_number,
    name,
    surname,
    birthday,
    phone_number,
    email,
    client_antiquity,
    password,
  } = req.body;

  if (password.length < 3) {
    return res
      .status(400)
      .json({
        message: "Please make your password at least 3 characters long",
      });
  }

  if (
    !client_number ||
    !name ||
    !surname ||
    !birthday ||
    !phone_number ||
    !email ||
    !client_antiquity ||
    !password
  ) {
    return res
      .status(400)
      .json({ message: "Please fill all the fields in the form" });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists. Please change your email" });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({
      client_number,
      name,
      surname,
      birthday,
      phone_number,
      email,
      client_antiquity,
      password: hashPass,
    })
      .then((newUser) => {
        // Passport req.login permite iniciar sesión tras crear el usuario
          if (error) {
            return res.status(500).json(error);
          }
          transporter.sendMail({
            from: "Iron Nails <ironhacknails@gmail.com>",
            to: email,
            subject: "Bienvenido a Iron Nails!",
            html:`<p>Gracias por tu registro ${name}</p>`
          })
          .then(() => {
            return res.status(200).json(newUser)
          })
          .catch(() => {
            return res.status(200).json(newUser)
          })

          return res.status(200).json(newUser);
       
      })
      .catch((error) => res.status(500).json(error));
  });
});

//LOGIN -----------
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, theUser, failureDetails) => {
    if (error) {
      return res.status(500).json(error);
    }

    if (!theUser) {
      return res.status(401).json(failureDetails);
    }

    req.login(theUser, (error) => {
      if (error) {
        return res.status(500).json(error);
      }

      return res.status(200).json(theUser);
    });
  })(req, res, next);
});

//LOGOUT
router.post("/logout", (req, res, next) => {
  // req.logout is defined by passport
  req.logout();
  return res.status(200).json({ message: "Log out success!" });
});

//EDIT USER
router.put("/editClient", (req, res, next) => {
  User.findOneAndUpdate({ _id: req.user.id }, { ...req.body }, { new: true })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json(err));
});

router.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated & req.user are defined by passport
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(403).json({ message: "Forbbiden" });
  }
});

module.exports = router;
