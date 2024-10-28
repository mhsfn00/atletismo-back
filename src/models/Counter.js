import mongoose from "mongoose";

const counterSchema = mongoose.Schema({
    counter: Number
}, {
    collection: 'counter'
});

module.exports = mongoose.model("Counter", counterSchema);