import mongoose from "mongoose";

const mainPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: String,
    article: String,
    date: { type: Date, required: true},
    imageAddress: String,
    stackOrder: { type: Number, index: { unique: true } }
}, {
    collection: 'mainPost'
});

module.exports = mongoose.model("MainPost", mainPostSchema);