const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middleware/authMiddleware');

router.use(verifyJWT).route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/getById')
    .get(usersController.getById)

module.exports = router;