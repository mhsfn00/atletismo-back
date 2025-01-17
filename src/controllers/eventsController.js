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
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body' });
    }

    const eventId = req.body._id;
    if(!eventId) {
        return res.status(400).json({'message' : 'event id needs to be provided'});
    }

    try {
        const dbRes = await Event.find({ _id: `${eventId}`});
        return res.status(200).json(dbRes);
    } catch (err) {
        return res.status(400).json(err.message);
    }
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
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body' });
    }

    const updatedEvent = req.body;
    console.log(updatedEvent)

    try {
        const dbRes = await Event.findOneAndUpdate({ _id: `${updatedEvent._id}`}, updatedEvent);
        res.status(200).json(dbRes);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const deleteEvent = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body' });
    }

    const eventId = req.body._id;
    if(!eventId) {
        return res.status(400).json({'message' : 'event id needs to be provided'});
    }

    try {
        const dbRes = await Event.findOneAndDelete({ _id: `${eventId}`});
        return res.status(200).json({ 'message' : `deleted event with id ${dbRes._id}`});
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

module.exports = {
    getEvents,
    getById,
    createEvent,
    updateEvent,
    deleteEvent
}