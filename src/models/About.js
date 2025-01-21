import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    information:  { type: String, required: true },
    lastUpdate: Date,
    contacts: [String]
}, {
    collection: 'about'
});

module.exports = mongoose.model("About", aboutSchema);