const mongoose = require("mongoose")

const ArticlesSchema = new mongoose.Schema({
    title: String,
    date: Date,
    summary: String,
})

const ArticlesModel = mongoose.model("articles", ArticlesSchema);
module.exports = ArticlesModel;