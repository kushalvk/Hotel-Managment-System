const express = require("express");
const FacilitiesModel = require("../models/FacilitiesSchema");

const router = express.Router();

// get All Facilities
router.get("/facilities", async (req, res) => {
  try {
    const facilities = await FacilitiesModel.find();
    res.json(facilities);
  } catch (err) {
    res.json(err);
  }
});

// add faciliti
router.post("/addfacility", (req, res) => {
  const { title, imageUrl, description } = req.body;

  FacilitiesModel.create({
    title,
    imageUrl,
    description,
  })
    .then((added) => res.json(added))
    .catch((err) => res.json(err));
});

module.exports = router;