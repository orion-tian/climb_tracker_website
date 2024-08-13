const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxLength: 25,
    match: [/^[a-zA-Z0-9_]+$/] //Username can only contain letters, numbers, and underscores
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;