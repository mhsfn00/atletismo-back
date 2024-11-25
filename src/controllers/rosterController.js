const Athlete = require('../models/Athlete.js');

const getBySex = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) { //Empty body returns all athletes
        try {
            const allAthletes = await Athlete.find().collation({ locale:'pt', strength: 1 }).sort({ name:1 });                     
            return res.status(200).json(allAthletes);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }

    try {
        // Getting athletes based on sex
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const createAthletes = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const arrayOfAthletes = req.body;
    let responses = [];

    try {
        for (const athlete of arrayOfAthletes) {
            const dbRes = await Athlete.create(athlete);
            responses.push({
                "Athlete created" : dbRes
            });
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }

    return res.status(200).json(responses);
}

const updateAthlete = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const arrayOfUpdatedAthletes = req.body;
    let responses = [];

    try {
        for (const athlete of arrayOfUpdatedAthletes) {
            console.log(athlete);
            const dbRes = await Athlete.findOneAndUpdate({ _id: `${athlete._id}`}, athlete);
            responses.push({
                "Athlete updated" : dbRes
            });
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }

    return res.status(200).json(responses);
}

const deleteAthlete = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const arrayOfIds = req.body;
    let responses = [];

    try {
        for (const id of arrayOfIds) {
            const dbRes = await Athlete.deleteOne({ _id: `${id._id}`});
            responses.push({
                "Athlete deleted" : dbRes
            });
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }

    return res.status(200).json(responses);
}

const getById = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const athleteId = req.body._id;
    if (!athleteId) {
        return res.status(400).json({ 'message': 'Request lacks athlete id'});
    } else {
        try {
            const dbRes = await Athlete.find({ _id: `${athleteId}`});
            if (dbRes.length != 0) {
                return res.status(200).json(dbRes[0]);
            } else {
                return res.status(400).json("Athlete was not found");
            }
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }
}


module.exports = {
    getBySex,
    getById,
    createAthletes,
    updateAthlete,
    deleteAthlete
}