import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: String,
    article: String,
    date: Date,
    imageAddress: String
}, {
    collection: 'posts'
});

module.exports = mongoose.model("Post", postSchema);