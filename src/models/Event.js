import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location : String,
    date: Date,
    imageAddress: String,
    duration: Number,
    season: { type: Number, required: true }
}, {
    collection: 'events'
});

module.exports = mongoose.model("Event", eventSchema);