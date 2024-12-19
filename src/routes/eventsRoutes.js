const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.route('/')
    .get(eventsController.getEvents)
    .post(eventsController.createEvent)
    .put(eventsController.updateEvent)
    .delete(eventsController.deleteEvent)

router.route('/getById')
    .get(eventsController.getById)

module.exports = router;