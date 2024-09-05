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

module.exports = router;
