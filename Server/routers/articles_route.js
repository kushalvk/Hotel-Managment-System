const express = require("express");
const ArticlesModel = require("../models/ArticlesSchema");

const router = express.Router();

// get All Articles
router.get("/articles", async (req, res) => {
  try {
    const addarticle = await ArticlesModel.find();
    res.json(addarticle);
  } catch (err) {
    res.json(err);
  }
});

// add Articles
router.post("/addarticle", (req, res) => {
  const { title, date, summary } = req.body;

  ArticlesModel.create({
    title,
    date,
    summary,
  })
    .then((added) => res.json(added))
    .catch((err) => res.json(err));
});

module.exports = router;