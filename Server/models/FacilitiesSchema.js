const mongoose = require("mongoose")

const FacilitiesSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    description: String,
})

const FacilitiesModel = mongoose.model("facilities", FacilitiesSchema);
module.exports = FacilitiesModel;