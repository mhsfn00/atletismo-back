const Coach = require('../models/Coach');

const getCoaches = async (req, res) => {
    return res.status(200).json({ 'message' : 'all coaches' });
}

const createCoaches = async (req, res) => {
    return res.status(200).json({ 'message' : 'creating coaches' });
}
const updateCoaches = async (req, res) => {
    return res.status(200).json({ 'message' : 'updating coaches' });
}

const deleteCoach = async (req, res) => {
    return res.status(200).json({ 'message' : 'deleting coach' });
}

const getById = async (req, res) => {
    return res.status(200).json({ 'message' : 'coach with given id' });
}

module.exports = {
    getCoaches,
    createCoaches,
    updateCoaches,
    deleteCoach,
    getById
}