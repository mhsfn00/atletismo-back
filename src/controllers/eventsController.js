const Event = require('../models/Event');

const getEvents = async (req, res) => {
    return res.status(200).json({"message" : "getting all events"});
}

const getById = async (req, res) => {
    return res.status(200).json({"message" : "getting specific event with id"});
}

const createEvent = async (req, res) => {
    return res.status(200).json({"message" : "creating event"});
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