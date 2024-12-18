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

const updateCoach = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const updatedCoach = req.body;

    try {
        const dbRes = await Coach.findOneAndUpdate({ _id: `${updatedCoach._id}`}, updatedCoach);
        if (dbRes) {
            return res.status(200).json(dbRes);
        } else {
            return res.status(400).json({ 'message ': 'Coach not updated' })
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const deleteCoach = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const coachId = req.body._id;
    if (!coachId) {
        return res.status(400).json({ 'message': 'Request lacks coach id'});
    }

    try {
        const dbRes = await Coach.deleteOne({ _id: `${coachId}`});
        if (dbRes.deletedCount == 1) {
            return res.status(200).json(dbRes);
        } else {
            return res.status(400).json({ 'message ': 'Coach not deleted' })
        }
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

    const coachId = req.body._id;
    if (!coachId) {
        return res.status(400).json({ 'message': 'Request lacks coach id'});
    }

    try {
        const dbRes = await Coach.findOne({ _id: `${coachId}`});
        if (dbRes) {
            return res.status(200).json(dbRes);
        } else {
            return res.status(400).json({ 'message ': 'Coach not found' })
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

module.exports = {
    getCoaches,
    createCoaches,
    updateCoach,
    deleteCoach,
    getById
}