import mongoose from "mongoose";

const PostsCounterSchema = mongoose.Schema({
    counter: Number
}, {
    collection: 'counter'
});

module.exports = mongoose.model("PostsCounter", PostsCounterSchema);