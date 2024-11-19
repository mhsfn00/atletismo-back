const Athlete = require('../models/Athlete.js');

const getBySex = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) { //Empty body returns all athletes
        const allAthletes = await Athlete.find().collation({ locale:'pt', strength: 1 }).sort({ name:1 });                     
        return res.status(200).json(allAthletes);
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

    for (const athlete of arrayOfAthletes) {
        const res = await Athlete.create(athlete);
        responses.push({
            "name" : athlete.name,
            "res" : res
        });
    }

    return res.status(200).json(responses);


}

const updateAthlete = async (req, res) => {
    return res.status(200).json("Updating athlete");
}

const deleteAthlete = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const id = req.body._id;
    const dbRes = await Athlete.deleteOne({ _id: `${id}`});

    return res.status(200).json(dbRes);
}

const getById = async (req, res) => {
    return res.status(200).json("Return athlete with id");
}


module.exports = {
    getBySex,
    getById,
    createAthletes,
    updateAthlete,
    deleteAthlete
}