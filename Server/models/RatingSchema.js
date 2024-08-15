const mongoose = require("mongoose")

const ratngSchema = new mongoose.Schema({
    name: String,
    star: String,
})

const RatingModel = mongoose.model("rating", ratngSchema);
module.exports = RatingModel;