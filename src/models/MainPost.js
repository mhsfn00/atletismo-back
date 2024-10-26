import mongoose from "mongoose";

const mainPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: String,
    article: String,
    date: Date,
    imageAddress: String,
    id: Number
}, {
    collection: 'mainPost'
});

module.exports = mongoose.model("MainPost", mainPostSchema);