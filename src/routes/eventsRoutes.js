const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const verifyJWT = require('../middleware/authMiddleware');

router.route('/')
    .get(eventsController.getEvents)
    .post(verifyJWT, eventsController.createEvents)
    .put(verifyJWT, eventsController.updateEvent)
    .delete(verifyJWT, eventsController.deleteEvent)

router.route('/getById')
    .get(eventsController.getById)

module.exports = router;