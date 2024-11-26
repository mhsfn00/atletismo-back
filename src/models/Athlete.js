import mongoose from "mongoose";

const athleteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sex: { type: String, enum: ['female', 'male'], required: true },
    pictureAddress: String,
    height: Number,
    weight: Number,
    events: String,
    year: Number,
}, {
    collection: 'roster'
});

module.exports = mongoose.model("Athlete", athleteSchema);