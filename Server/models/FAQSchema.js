const mongoose = require("mongoose")

const FAQSchema = new mongoose.Schema({
    question: String,
    answer: String,
})

const FAQModel = mongoose.model("faqs", FAQSchema);
module.exports = FAQModel;