const express = require('express');
const router = express.Router();
const rosterController = require('../controllers/rosterController');

router.route('/')
    .get(rosterController.getBySex)
    .post(rosterController.createAthlete)
    .put(rosterController.updateAthlete)
    .delete(rosterController.deleteAthlete)

router.route('/getById')
    .get(rosterController.getById)

module.exports = router;