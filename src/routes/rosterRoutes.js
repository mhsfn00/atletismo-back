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
    const rosterYear = Number(req.params.year);
    const newAthletes = req.body;

    const femaleAthletes = [];
    const maleAthletes = [];
    newAthletes.forEach(athlete => {
        if (athlete.sex === "female") {
            //Check if name already exists
            
            delete athlete.sex;
            femaleAthletes.push(athlete);
        } else if (athlete.sex === "male") {
            //Check if name already exists
            
            delete athlete.sex;
            maleAthletes.push(athlete);
        }
    });

    const femaleResult = await db.collection('rosters').updateOne(
        {year: rosterYear}, {$push: {
            female: {$each: femaleAthletes}
        }}
    );

    const maleResult = await db.collection('rosters').updateOne(
        {year: rosterYear}, {$push: {
            male: {$each: maleAthletes}
        }}
    );


    res.send({ femaleResult: femaleResult, maleResult: maleResult });
});

module.exports = router;