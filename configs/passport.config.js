const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User.model");
const Worker = require("../models/Worker.model");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  // Identificará a un usuario con una sesión (Asignará a la sesión el id del usuario)
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  // Identificará a qué usuario pertenece la sesión
  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then((user) => {
        console.log("DeserializeUser");
        if (!user) {
          Worker.findById(id).then((worker) => {
            console.log("DeserializeWorker");
            cb(null, worker);
          });
        } else {
          cb(null, user);
        }
      })
      .catch((error) => cb(error));
  });

  // Local Strategy
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      (req, email, password, next) => {
        User.findOne({ email })
          .then((user) => {
            console.log("Passport user", user);
            if (!user) {
              Worker.findOne({ email })
                .then((worker) => {
                  console.log("Passport worker", worker);
                  if (!worker) {
                    return next(null, false, {
                      message: "Email o contraseña incorrectos linea 45.",
                    });
                  }

                  if (bcrypt.compareSync(password, worker.password)) {
                    console.log("Login worker");
                    return next(null, worker);
                  } else {
                    return next(null, false, {
                      message: "Email o contraseña incorrectos linea 54",
                    });
                  }
                })
                .catch((error) => next(error));
              //return next(null, false, { message: 'Email o contraseña incorrectos.'});
            } else {
              if (user && bcrypt.compareSync(password, user.password)) {
                console.log("Login user");
                return next(null, user);
              } else {
                return next(null, false, {
                  message: "Email o contraseña incorrectos linea 67",
                });
              }
            }
          })
          .catch((error) => next(error));
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
