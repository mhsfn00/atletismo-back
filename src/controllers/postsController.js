const Post = require('../models/Post.js');
const MainPost = require('../models/MainPost.js');

const getAllPosts = async (req, res) => {
    const allPosts = await Post.find();     //All normal posts
    const mainPost = await MainPost.find(); //Main post
    allPosts.unshift(mainPost);             //Main post in the first position
    return res.status(200).json(allPosts);
}

const createPost = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const newPostJSon = req.body;

    try {
        if (newPostJSon.mainPost) { //if flagged as main post (will be default on the frontend)
            if (MainPost.find().length() == 0) {
                const dbRes = await MainPost.create(newPostJSon);
                return res.status(201).json(dbRes);
            } else {
                const previousMainPost = await MainPost.find()[0]; //get current main post
                const dbResCreate = MainPost.create(previousMainPost); //save current main post as normal post
                const dbResUpdate = await MainPost.findOneAndUpdate({}, newPostJSon); //update main post with new post
                return res.status(201).json(dbResCreate, dbResUpdate);
            }
        } else { //not flagged as main, keeps the previous main post
            const dbRes = await Post.create(newPostJSon);
            return res.status(201).json(dbRes);     
        }
    } catch (err) {
        console.log(err.message);
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
        console.log(err.message);
        return res.status(400).json(err.message);
    }
}

const deletePost = (req, res) => {
    
}

const getPostById = (req, res) => {

}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getPostById
}