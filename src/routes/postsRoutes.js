const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const verifyJWT = require('../middleware/authMiddleware');

router.route('/')
    .get(postsController.getByQuantity)
    .post(verifyJWT, postsController.createPost)
    .put(verifyJWT, postsController.updatePost)
    .delete(verifyJWT, postsController.deletePost)

router.route('/getById')
    .get(postsController.getPostById)

module.exports = router;