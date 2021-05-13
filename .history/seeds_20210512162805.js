require('dotenv').config();

const users = require('./data/user.data');
const User = require('./models/User.model');

const services = require('./data/service.data');
const Service = require('./models/Service.model');

const workers = require('./data/worker.data');
const Worker = require('./models/Worker.model');

const reserves = require('./data/reserve.data');
const Reserve = require('./models/Reserve.model');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
.then (() => {
  console.log('Connected to database')
  User.insertMany(users)
    .then(users => {
      console.log(`${users.length} inserted.`)
  })
  Service.insertMany(services)
  .then(services => {
    console.log(`${services.length} inserted.`)
  })
  Worker.insertMany(workers)
  .then(workers => {
    console.log(`${workers.length} inserted.`)
  })
  Reserve.insertMany(reserves)
  .then(reserves => {
    console.log(`${reserves.length} inserted.`)
  })
})
.catch(error => console.error(error));