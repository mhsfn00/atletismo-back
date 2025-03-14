const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const verifyJWT = require('../middleware/authMiddleware');

router.route('/')
    .get(aboutController.getAbout)
    .post(verifyJWT, aboutController.createAbout)
    .put(verifyJWT, aboutController.updateAbout)

module.exports = router;