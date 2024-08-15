const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  person: Number,
  city: String,
  checkin: Date,
  checkout: Date,
  typeroom: String,
  price: String,
});

const BookingModel = mongoose.model("booking", BookingSchema);
module.exports = BookingModel;
