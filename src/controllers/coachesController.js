const Coach = require('../models/Coach');

const getCoaches = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else {
        try {
            const allCoaches = await Coach.find();
            return res.status(200).json(allCoaches);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }
}

const createCoaches = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const newCoaches = req.body; //Array of coaches
    let dbResponses = [];

    try {
        for (const newCoach of newCoaches) {
            const dbRes = await Coach.create(newCoach);
            dbResponses.push({
                'Coach created' : dbRes
            });
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }

    return res.status(200).json(dbResponses);
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