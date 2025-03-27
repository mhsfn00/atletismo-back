const Event = require('../models/Event');

const getEvents = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body' });
    }

    const season = req.body.season;
    if(!season) {
        return res.status(400).json({
            'message' : 'season needs to be provided'
        });
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
        return res.status(400).json({
            'message' : 'event id needs to be provided'
        });
    }

    try {
        const dbRes = await Event.find({ _id: `${eventId}`});
        return res.status(200).json(dbRes);
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const createEvents = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body' });
    }

    const newEvents = req.body;
    let dbResponses = [];

    for (const event of newEvents) {
        try {
            const dbRes = await Event.create(event);
            dbResponses.push({
                'Event created' : dbRes
            });
        } catch (err) {
            dbResponses.push({
                'Not created' : event,
                'reason' : err.message
            });
        }
    }

    return res.status(200).json(dbResponses);
}

const updateEvent = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body' });
    }

    const updatedEvent = req.body;

    try {
        const dbRes = await Event.findOneAndUpdate({ 
            _id: `${updatedEvent._id}`}, 
            updatedEvent,
            { new : true}
        );
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
    createEvents,
    updateEvent,
    deleteEvent
}