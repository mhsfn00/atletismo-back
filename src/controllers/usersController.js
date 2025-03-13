const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {        
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else {
        try {
            const allUsers = await User.find({}, 
                {   'username' : 1, 
                    'name' : 1,
                    'isAdmin': 1
                });
            return res.status(200).json(allUsers);
        }catch (err) {
            return res.status(400).json(err.message);
        }
    }
}

const createUser = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    try {
        const newUser = req.body;
        const plainPassword = newUser.password;
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        newUser.password = hashedPassword;
        const dbRes = await User.create(newUser);
        if (dbRes) {
            return res.status(200).json({'message' : 'User updated'})
        } else {
            return res.status(200).json({'message' : 'Error while updating on database'})
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const updateUser = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    try {
        const updatedUser = req.body;
        const plainPassword = updatedUser.password;
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        updatedUser.password = hashedPassword;
        const dbRes = await User.findOneAndUpdate({ _id: updatedUser._id }, updatedUser);
        if (dbRes) {
            return res.status(200).json({'message' : 'User updated'})
        } else {
            return res.status(200).json({'message' : 'Error while updating on database'})
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const deleteUser = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    try {
        const userId = req.body._id;
        const dbRes = await User.deleteOne({ _id: `${userId}`});
        return res.status(200).json(dbRes);
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const getById = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    try {
        const userId = req.body._id;
        const dbRes = await User.find({ _id: `${userId}`});
        return res.status(200).json(dbRes);
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getById
}