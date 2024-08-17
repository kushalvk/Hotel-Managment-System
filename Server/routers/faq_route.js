const express = require("express");
const FAQModel = require("../models/FAQSchema");

const router = express.Router();

// get All FAQ
router.get("/faqs", async (req, res) => {
  try {
    const faqs = await FAQModel.find();
    res.json(faqs);
  } catch (err) {
    res.json(err);
  }
});

// add FAQ
router.post("/addfaq", (req, res) => {
  const { question, answer } = req.body;

  FAQModel.create({
    question,
    answer,
  })
    .then((added) => res.json(added))
    .catch((err) => res.json(err));
});

module.exports = router;