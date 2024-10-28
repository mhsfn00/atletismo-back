const Post = require('../models/Post.js');
const MainPost = require('../models/MainPost.js');
const Counter = require('../models/Counter.js');

const getByQuantity = async (req, res) => {        
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) { //Empty body returns all posts
        const allPosts = await Post.find().sort(-1);
        const mainPost = await MainPost.find();         
        allPosts.unshift(mainPost);                     
        return res.status(200).json(allPosts);
    }

    const targetStackOrder = req.body.stackOrder;
    const quantity = req.body.quantity;
    const mainPost = req.body.mainPost;

    const manyPosts = 
}

// Gonna need an endpoint to get a certain amount of posts
// and then load however many more from the last post loaded,
// already added id for that

const createPost = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const newPostJSon = req.body;

    try {
        if (newPostJSon.mainPost) { //If flagged as main post (will be default on the frontend)
            let dbRes = await MainPost.find();
            if (dbRes.length == 0) {
                dbRes = await MainPost.create(newPostJSon);
                return res.status(201).json(dbRes);
            } else {
                dbRes = await MainPost.find(); //get current main post
                const previousMainPost = dbRes[0];
                const newNormalPost = new Post ({
                    title: previousMainPost.title,
                    subTitle: previousMainPost.subTitle,
                    article: previousMainPost.article,
                    date: previousMainPost.date,
                    imageAddress: previousMainPost.imageAddress
                });
                await Post.create(newNormalPost); //save current main post as normal post
                const dbResUpdate = await MainPost.findOneAndUpdate({}, newPostJSon); //update main post with new post
                return res.status(201).json(dbResUpdate);
            }
        } else { //not flagged as main, keeps the previous main post
            const dbRes = await Post.create(newPostJSon);
            return res.status(201).json(dbRes);     
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const updatePost = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const updatedPostJSon = req.body;

    try {
        if (updatedPostJSon.mainPost) {
            const dbRes = await MainPost.findOneAndUpdate({}, updatedPostJSon);
            return res.status(200).json(dbRes);
        } else {
            const filter = { _id: `${updatedPostJSon._id}`};
            const dbRes = await Post.findOneAndUpdate(filter, updatedPostJSon);
            return res.status(200).json(dbRes);
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const deletePost = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const postId = req.body._id;
    if (!postId) {
        return res.status(400).json({ 'message': 'Could not find post id'});
    }

    try {
        let dbRes = await MainPost.find({ _id: `${postId}`});
        if (dbRes.length != 0) {
            await MainPost.deleteOne({ _id: `${postId}`});
            return res.status(200).json({ 'message': 'Post deleted successfuly'});
        } else {
            dbRes = await Post.find({ _id: `${postId}`});
            if (dbRes.length != 0) {
                await Post.deleteOne({ _id: `${postId}`});
                return res.status(200).json({ 'message': 'Post deleted successfuly'});
            } else {
                return res.status(400).json("Post was not found");
            }
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const getPostById = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const postId = req.body._id;
    if (!postId) {
        return res.status(400).json({ 'message': 'Could not find post id'});
    }

    try {
        let dbRes = await MainPost.find({ _id: `${postId}`});
        if (dbRes.length != 0) {
            return res.status(200).json(dbRes[0]);
        } else {
            dbRes = await Post.find({ _id: `${postId}`});
            if (dbRes.length != 0) {
                return res.status(200).json(dbRes[0]);
            } else {
                return res.status(400).json("Post was not found");
            }
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

module.exports = {
    getByQuantity,
    createPost,
    updatePost,
    deletePost,
    getPostById
}