const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
    .get(usersController.getUser)
    .post(usersController.createUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/getById')
    .get(usersController.getById)

module.exports = router;