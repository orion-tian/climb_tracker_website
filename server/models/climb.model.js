const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const climbSchema = new Schema({
  username: { type: String, required: true },
  image: { type: Buffer, required: true },
  description: { type: String, required: true },
  grade: { type: Number, required: true },
  attempts: { type: Number, required: true },
  date: { type: Date, required: true }
}, {
  timestamps: true,
});

const Climb = mongoose.model('Climb', climbSchema);
module.exports = Climb;