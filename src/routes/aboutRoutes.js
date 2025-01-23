const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

router.route('/')
    .get(aboutController.getAbout)
    .post(aboutController.createAbout)
    .put(aboutController.updateAbout)

module.exports = router;