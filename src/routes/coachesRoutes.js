const express = require('express');
const router = express.Router();
const coachesController = require('../controllers/coachesController');
const verifyJWT = require('../middleware/authMiddleware');

router.route('/')
    .get(coachesController.getCoaches)
    .post(verifyJWT, coachesController.createCoaches)
    .put(verifyJWT, coachesController.updateCoach)
    .delete(verifyJWT, coachesController.deleteCoaches)

router.route('/getById')
    .get(coachesController.getById)

module.exports = router;