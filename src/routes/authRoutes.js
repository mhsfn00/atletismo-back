const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/login')
    .post(authController.login)


module.exports = router;