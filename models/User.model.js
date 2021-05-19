const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const userSchema = new Schema({
  client_number: { type: Number, required: true, /*unique: true*/ },
  name: { type: String, required: true, trim: true },
  surname: { type: String, required: true, trim: true },
  client_antiquity: {type: Date, default: Date.now().toLocaleDate},
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
    match: [/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, 'Please fill a valid email']
  },
  password: { type: String, required: true, minlength: 3, match: PASSWORD_REGEX },
  birthday: {type: String, required: true},
  phone_number: {type: String, required: true },
  service_reserve: [],
  promotions: [],
  worker: {type: Schema.Types.ObjectId, ref: 'Worker', default: null}
  //avatar: {type: String, required: true}
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;

      return ret;
    }
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;