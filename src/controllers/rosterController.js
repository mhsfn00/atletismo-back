const Athlete = require('../models/Athlete.js');

const getBySex = async (req, res) => {
    return res.status(200).json("Getting atheltes by sex");
}

const createAthlete = async (req, res) => {
    return res.status(200).json("Creating athlete");
}

const updateAthlete = async (req, res) => {
    return res.status(200).json("Updating athlete");
}

const deleteAthlete = async (req, res) => {
    return res.status(200).json("Deleting athlete");
}

const getById = async (req, res) => {
    return res.status(200).json("Return athlete with id");
}


module.exports = {
    getBySex,
    getById,
    createAthlete,
    updateAthlete,
    deleteAthlete
}