import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: String,
    article: String,
    date: { type: Date, required: true},
    imageAddress: String,
    stackOrder: { type: Number, index: { unique: true } }
}, {
    collection: 'posts'
});

module.exports = mongoose.model("Post", postSchema);