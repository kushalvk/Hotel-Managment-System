const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  name: String,
  cardHolderName: String,
  cardNumber: Number,
  expiryDate: Date,
  cvv: Number,
  amount: Number,
});

const PaymentModel = mongoose.model("payments", PaymentSchema);
module.exports = PaymentModel;
