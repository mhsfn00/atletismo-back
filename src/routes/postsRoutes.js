const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.route('/')
    .get(postsController.getByQuantity)
    .post(postsController.createPost)
    .put(postsController.updatePost)
    .delete(postsController.deletePost)

router.route('/getById')
    .get(postsController.getPostById)

module.exports = router;