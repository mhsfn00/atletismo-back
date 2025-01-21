const About = require('../models/About');

const getAbout = async (req, res) => {
    return res.status(200).json({ 'message': 'getting about page info'});
}

const updateAbout = async (req, res) => {
    return res.status(200).json({ 'message': 'updating about info'});
}

const createAbout = async (req, res) => {
    return res.status(200).json({ 'message': 'creating about page'});
}

module.exports = {
    getAbout,
    updateAbout,
    createAbout
}