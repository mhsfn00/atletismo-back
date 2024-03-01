const express = require('express');
const router = express.Router();

router.get('/getRoster/:year', async (req, res) => {
    const db = req.app.get('db');
    const rosterYear = Number(req.params.year);
    const roster = await db.collection('rosters').find({'year': rosterYear}).toArray();

    res.json({female: roster[0].female, male: roster[0].male});
});

router.get('/getRosters', async (req, res) => {
    const db = req.app.get('db');
   
    const rosters = await db.collection('rosters').find().toArray();
    const rosterYears = [];

    rosters.forEach(roster => {
        rosterYears.push(roster.year);
    })

    res.send(rosterYears);
});

router.post('/addAthletes/:year', async (req, res) => {
    const db = req.app.get('db');
    const rosterYear = req.params.year;
    const newAthletes = req.body;

    const femaleAthletes = [];
    const maleAthletes = [];
    newAthletes.forEach(athlete => {
        if (athlete.sex === "female") {
            delete athlete.sex;
            femaleAthletes.push(athlete);
        } else if (athlete.sex === "male") {
            delete athlete.sex;
            maleAthletes.push(athlete);
        }
    });

    const femaleResult = await db.collection(`roster${rosterYear}`).
        updateOne({sex: "female"}, {$push: {athletes: {$each: femaleAthletes}}});
    const maleResult = await db.collection(`roster${rosterYear}`).
        updateOne({sex: "male"}, {$push: {athletes: {$each: maleAthletes}}});

    res.send({ femaleResult: femaleResult, maleResult: maleResult });
});

module.exports = router;