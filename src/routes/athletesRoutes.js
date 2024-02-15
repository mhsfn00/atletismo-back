const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const db = req.app.get('db');
    const athletes = await db.collection('roster').find({}).toArray();

    res.json(athletes);
});

module.exports = router;