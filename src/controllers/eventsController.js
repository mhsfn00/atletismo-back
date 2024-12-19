const Event = require('../models/Event');

const getEvents = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body' });
    }

    const season = req.body.season;
    if(!season) {
        return res.status(400).json({'message' : 'season needs to be provided'});
    }

    try {
        const dbRes = await Event.find({ season : `${season}` });
        return res.status(200).json(dbRes);
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const getById = async (req, res) => {
    return res.status(200).json({"message" : "getting specific event with id"});
}

const createEvent = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body' });
    }

    const newEvent = req.body;

    try {
        const dbRes = await Event.create(newEvent);
        return res.status(200).json(dbRes);
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const updateEvent = async (req, res) => {
    return res.status(200).json({"message" : "updating event with id"});
}

const deleteEvent = async (req, res) => {
    return res.status(200).json({"message" : "deleting event with id"});
}

module.exports = {
    getEvents,
    getById,
    createEvent,
    updateEvent,
    deleteEvent
}