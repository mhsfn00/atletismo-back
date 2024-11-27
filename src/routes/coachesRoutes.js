const express = require('express');
const router = express.Router();
const coachesController = require('../controllers/coachesController');

router.route('/')
    .get(coachesController.getCoaches)
    .post(coachesController.createCoaches)
    .put(coachesController.updateCoaches)
    .delete(coachesController.deleteCoach)

router.route('/getById')
    .get(coachesController.getById)

module.exports = router;