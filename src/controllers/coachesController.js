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

    for (const newCoach of newCoaches) {
        try {
            const dbRes = await Coach.create(newCoach);
            dbResponses.push({
                'Coach created' : dbRes
            });
        } catch (err) {
            dbResponses.push({
                'Not created' : newCoach,
                'reason' : err.message
            });
        }
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
        const dbRes = await Coach.findOneAndUpdate({ 
            _id: `${updatedCoach._id}`}, 
            updatedCoach,
            { new : true }
        );
        if (dbRes) {
            return res.status(200).json(dbRes);
        } else {
            return res.status(400).json({ 
                'message ': 'Coach not found' 
            });
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const deleteCoaches = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const arrayOfIds = req.body;
    console.log(arrayOfIds)
    let responses = [];

    for (const id of arrayOfIds) {
        try {
            const dbRes = await Coach.deleteOne({ 
                _id: `${id._id}`
            });
            responses.push({
                "Coach id" : id._id,
                "Deleted" : dbRes.deletedCount == 1 ? "True" : "False"
            });
        } catch (err) {
            responses.push({
                "Coach id" : id._id,
                "Deleted" : "Assuming it was'nt",
                "Reason" : err.message
            });
        }
    }

    return res.status(200).json(responses);
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
    deleteCoaches,
    getById
}