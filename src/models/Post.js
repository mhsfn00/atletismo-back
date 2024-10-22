import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    subTitle: String,
    article: String,
    date: Date,
    imageAddress: String
}, {
    collection: 'posts'
});

module.exports = mongoose.model("Post", postSchema);