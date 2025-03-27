const About = require('../models/About');

const getAbout = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    }

    try {
        const dbRes = await About.findOne();
        return res.status(200).json(dbRes);
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const updateAbout = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const newAbout = req.body;
    try {
        const dbRes = await About.findOneAndUpdate(
            {}, 
            newAbout,
            { new : true}
        );
        return res.status(200).json(dbRes);
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const createAbout = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const newAbout = req.body;
    try {
        const dbRes = await About.create(newAbout);
        return res.status(200).json(dbRes);
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

module.exports = {
    getAbout,
    updateAbout,
    createAbout
}