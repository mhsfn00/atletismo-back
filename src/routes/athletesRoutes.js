const express = require('express');
const router = express.Router();

router.get('/:year', async (req, res) => {
    const db = req.app.get('db');
    const rosterYear = req.params.year;
    const athletes = await db.collection(`roster${rosterYear}`).find({}).toArray();

    res.json(athletes);
});

router.post('/addAthletes/:year', async (req, res) => {
    const db = req.app.get('db');
    const rosterYear = req.params.year;
    const newAthletes = req.body;

    res.send(true);
})

module.exports = router;