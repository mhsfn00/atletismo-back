const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const db = req.app.get('db');
    const posts = await db.collection('posts').find({}, { limit: 5 }).toArray(); // Collection posts contains all posts not tagged as mainPost
    const mainPost = await db.collection('mainPost').findOne({}); // Finds the only main post, its own collection (mainPost), capped to 1 object

    posts.unshift(mainPost); // mainPost in the first position of posts

    res.json(posts);
});

router.get('/:postId', async (req, res) => {
    const db = req.app.get('db');
    const postId = req.params.postId; // postId from request
    const post = await db.collection('mainPost').findOne({ id: postId }) ? // Checking for the post id in the mainPost collection first
        await db.collection('mainPost').findOne({ id: postId }) : await db.collection('posts').findOne({ id: postId });  

    res.json(post);
});

router.post('/:postId/editPost', async (req, res) => {
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