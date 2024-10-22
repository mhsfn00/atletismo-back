import mongoose from "mongoose";

const mainPostSchema = new mongoose.Schema({
    title: String,
    subTitle: String,
    article: String,
    date: Date,
    imageAddress: String
}, {
    collection: 'mainPost'
});

module.exports = mongoose.model("MainPost", mainPostSchema);