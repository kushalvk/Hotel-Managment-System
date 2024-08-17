const express = require("express");
const ReviewModel = require("../models/ReviewsSchema");

const router = express.Router();

// get All Reviews
router.get("/reviews", async (req, res) => {
  try {
    const addreviews = await ReviewModel.find();
    res.json(addreviews);
  } catch (err) {
    res.json(err);
  }
});

// add Reviews
router.post("/addreview", (req, res) => {
  const { name, review } = req.body;

  ReviewModel.create({
    name,
    review,
  })
    .then((added) => res.json(added))
    .catch((err) => res.json(err));
});

// delete Review
router.delete("/review/:id", async (req, res) => {
  try {
    const reviewid = req.params.id;
    console.log("Deleting booking ID:", reviewid);

    // Find the booking by ID and delete it
    const deletedReview = await ReviewModel.findByIdAndDelete(reviewid);

    res.json(deletedReview);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;