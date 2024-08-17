const express = require("express");
const RatingModel = require("../models/RatingSchema");

const router = express.Router();

// get All Rating
router.get("/ratings", async (req, res) => {
  try {
    const ratings = await RatingModel.find();
    res.json(ratings);
  } catch (err) {
    res.json(err);
  }
});

// add Rating
router.post("/addrating", (req, res) => {
  const { name, star } = req.body;

  RatingModel.create({
    name,
    star,
  })
    .then((added) => res.json(added))
    .catch((err) => res.json(err));
});

module.exports = router;