const express = require('express');
const router = express.Router();
const rosterController = require('../controllers/rosterController');
const verifyJWT = require('../middleware/authMiddleware');

router.route('/')
    .get(rosterController.getBySex)
    .post(verifyJWT, rosterController.createAthletes)
    .put(verifyJWT, rosterController.updateAthlete)
    .delete(verifyJWT, rosterController.deleteAthlete)

router.route('/getById')
    .get(rosterController.getById)

module.exports = router;