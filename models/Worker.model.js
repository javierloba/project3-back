const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone_number: {type: Number, required: true },
    role: { type: String, enum: ["Admin", "Worker"]},
    todo_services: [],
    done_services: []
})

const Worker = mongoose.model('Worker', workerSchema);
module.exports = Worker;