const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    name: String,
    review: String,
})

const ReviewModel = mongoose.model("review", ReviewSchema);
module.exports = ReviewModel;