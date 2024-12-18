import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
	name: { type: String, required: true },
	pictureAddress: String,
	titles: String,
	groups: String,
}, {
    collection: 'coaches'
});

module.exports = mongoose.model("Coach", coachSchema);
