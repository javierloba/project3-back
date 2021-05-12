const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: Name, required: true},
    price: {type: Number, required: true},
    reserves: [{type: Schema.Types.ObjectId, ref: 'Reserve'}]
})

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;