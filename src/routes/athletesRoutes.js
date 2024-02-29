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


    // Have to figure out a way of getting these insertion results
    let arrayOfResults = [];
    newAthletes.forEach(async athlete => {
        const athletesSex = athlete.sex;
        delete athlete.sex;
        arrayOfResults.push(await db.collection(`roster${rosterYear}`).updateOne({"sex" : `${athletesSex}`}, {$push: {"athletes": athlete}}));
    });

    console.log(arrayOfResults);

    res.send(true);
})

module.exports = router;