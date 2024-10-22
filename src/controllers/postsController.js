const Post = require('../models/Post.js');
const MainPost = require('../models/MainPost.js');

const getAllPosts = async (req, res) => {
    const allPosts = await Post.find();
    const mainPost = await MainPost.find();
    allPosts.unshift(mainPost);
    return res.status(200).json(allPosts);
}

const createPost = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const newPostJSon = req.body;
    const newPost = new MainPost({
        title: newPostJSon.title,
        subTitle: newPostJSon.subTitle,
        article: newPostJSon.article,
        date: newPostJSon.date,
        imageAddres: newPostJSon.imageAddres
    });

    try {
        if (newPostJSon.mainPost) { //if flagged as main post (will be default on the frontend)
            if (MainPost.find().length() == 0) {
                const dbRes = await MainPost.create(newPost);
                return res.status(201).json(dbRes);
            } else {
                const previousMainPost = await MainPost.find()[0]; //get current main post
                const dbResCreate = MainPost.create(previousMainPost); //save current main post as normal post
                const dbResUpdate = await MainPost.findOneAndUpdate({}, newPost); //update main post with new post
                return res.status(201).json(dbResCreate, dbResUpdate);
            }
        } else { //not flagged as main, keeps the previous main post
            const dbRes = Post.create(newPost);
            return res.status(201).json(dbRes);     
        }
    } catch (err) {
        console.error(err);
    }
}

const updatePost = (req, res) => {

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