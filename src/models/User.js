import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true}
}, {
    collection: 'users'
});

module.exports = mongoose.model("User", userSchema);