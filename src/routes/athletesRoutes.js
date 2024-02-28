const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const db = req.app.get('db');
    const athletes = await db.collection('roster').find({}).toArray();

    res.json(athletes);
});

router.post('/addAthletes', async (req, res) => {
    const db = req.app.get('db');
    console.log(req.body);
    res.send(true);
})

module.exports = router;