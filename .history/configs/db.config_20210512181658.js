const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/project3-api`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to Mongo!'))
.catch((error) => console.error(error))

module.exports = mongoose;