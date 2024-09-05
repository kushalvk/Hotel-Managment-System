const express = require("express");
const PaymentModel = require("../models/PaymentSchema");

const router = express.Router();

// Add Booking
router.post("/payment", (req, res) => {
  const payment = req.body;

  PaymentModel.create(payment)
    .then((pay) => res.json(pay))
    .catch((err) => res.json(err));
});

// get All Payment
router.get("/payments", async (req, res) => {
  try {
    const payments = await PaymentModel.find();
    res.json(payments);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
