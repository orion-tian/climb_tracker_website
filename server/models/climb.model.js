const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const climbSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  grade: {
    type: Number,
    required: true
  },
  attempts: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true,
});

const Climb = mongoose.model('Climb', climbSchema);
module.exports = Climb;