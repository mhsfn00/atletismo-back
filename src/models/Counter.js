import mongoose from "mongoose";

const counterSchema = mongoose.model('Counter', {
    counter: Number
}, {
    collection: 'counter'
});

module.exports = mongoose.model("Counter", counterSchema);