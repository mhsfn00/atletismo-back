const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.route('/')
    .get(postsController.getAllPosts)
    .post(postsController.createPost)
    .put(postsController.updatePost)
    .delete()

router.route('/:id')
    .get()

router.post('/newPost', async (req, res) => {
    try {
        // add as main post if needed
        const dbRes = await MainPost.find();
        if (dbRes.length == 0) {
            console.log("exists but its empty");
        }
        console.log("responsE--> ", dbRes);
        // else add as normal post 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:postId', async (req, res) => {
    const db = req.app.get('db');
    const postId = req.params.postId; // postId from request
    const post = await db.collection('mainPost').findOne({ id: postId }) ? // Checking for the post id in the mainPost collection first
        await db.collection('mainPost').findOne({ id: postId }) : await db.collection('posts').findOne({ id: postId });  

    res.json(post);
});

router.put('/:postId/editPost', async (req, res) => {
    const db = req.app.get('db');
    const modifiedPost = req.body;
    const mainPost = await db.collection('mainPost').findOne({ id: modifiedPost.id }) ? true : false;
    const collection = mainPost ? 'mainPost' : 'posts';

    const mongoResponse = await db.collection(`${collection}`).updateOne({id: modifiedPost.id },
        {$set: {
            title: modifiedPost.title,
            imageLink: modifiedPost.imageLink,
            text: modifiedPost.text,
            lastModified: new Date().toDateString(),
        }}
    );
    
    res.send(JSON.stringify(mongoResponse));
});

module.exports = router;