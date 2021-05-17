require('dotenv').config();
const express = require('express');

// DB config
require('./configs/db.config');

const app = express();

// Middleware config
require('./configs/middleware.config')(app);
require('./configs/cors.config')(app);

// Session config + Passport
require('./configs/session.config')(app);
require('./configs/passport.config')(app);


const authRouter = require('./routes/auth.routes');
const reserveRouter = require('./routes/reserve.routes');
const serviceRouter = require('./routes/service.routes');
const userRouter = require('./routes/user.routes');
const workerRouter = require('./routes/worker.routes');

app.use('/api/auth', authRouter);
app.use('/api/reserve', reserveRouter);
app.use('./api/service', serviceRouter);
app.use('./api/user', userRouter);
app.use('./api/worker', workerRouter);

//  Catch 404 and respond with error message
app.use((req, res, next) => {
  return res.status(404).json({ message: "Not found"});
})

module.exports = app;