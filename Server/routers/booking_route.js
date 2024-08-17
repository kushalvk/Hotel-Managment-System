const express = require("express");
const BookingModel = require("../models/BookinSchema");

const router = express.Router();

// Add Booking
router.post("/booking", (req, res) => {
  const {
    name,
    email,
    phone,
    person,
    city,
    checkin,
    checkout,
    typeroom,
    price,
  } = req.body;

  BookingModel.create({
    name,
    email,
    phone,
    person,
    city,
    checkin,
    checkout,
    typeroom,
    price,
  })
    .then((booked) => res.json(booked))
    .catch((err) => res.json(err));
});

// get All bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.json(bookings);
  } catch (err) {
    res.json(err);
  }
});

// get bookings by name
router.get("/mybookings/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const bookings = await BookingModel.find({ name });
    res.json(bookings);
  } catch (err) {
    res.json(err);
  }
});

// get bookings by id
router.get("/upbookings/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bookings = await BookingModel.findById(id);
    res.json(bookings);
  } catch (err) {
    res.json(err);
  }
});

// update Booking
router.post("/updatebooking/:id", (req, res) => {
  const bookingId = req.params.id;

  const { email, phone, person, city, checkin, checkout, typeroom, price } =
    req.body;

  const updateData = {
    email,
    phone,
    person,
    city,
    checkin,
    checkout,
    typeroom,
    price,
  };

  BookingModel.findByIdAndUpdate(bookingId, updateData)
    .then((updated) => res.json(updated))
    .catch((err) => res.json(err));
});

// delete booking
router.delete("/booking/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    console.log("Deleting booking ID:", bookingId);

    // Find the booking by ID and delete it
    const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);

    res.json(deletedBooking);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;