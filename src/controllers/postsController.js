const Post = require('../models/Post.js');
const MainPost = require('../models/MainPost.js');
const PostsCounter = require('../models/PostsCounter.js');

const getByQuantity = async (req, res) => {        
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) { //Empty body returns all posts
        const allPosts = await Post.find().sort({title: -1});
        const mainPost = await MainPost.find();         
        allPosts.unshift(mainPost);                     
        return res.status(200).json(allPosts);
    } else {
        const quantityToSkip = req.body.quantityToSkip;
        const quantityToGet = req.body.quantityToGet;
        const getMainPost = req.body.getMainPost;

        if(getMainPost) {
            const mainPost = await MainPost.find();
            let manyPostsWMain = await Post.find().skip(quantityToSkip).limit(quantityToGet).sort({stackOrder: -1});
            manyPostsWMain.unshift(mainPost);
            return res.status(200).json(manyPostsWMain);
        } else {
            const manyPosts = await Post.find().skip(quantityToSkip).limit(quantityToGet).sort({stackOrder: -1});
        return res.status(200).json(manyPosts);
        }
    }
}

const createPost = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 'message': 'Empty request body'});
    }

    const newPostJSon = req.body;
    const postsCounter = await PostsCounter.find({});
    if (Object.keys(postsCounter).length === 0) {
        PostsCounter.create({ counter: 0 }); //Initializes counter if it does'nt exist yet (will probably happen once)
    }
   
    const newPostStackOrder = postsCounter[0].counter;
    const newPost = {
        title: newPostJSon.title,
        subTitle: newPostJSon.subTitle,
        article: newPostJSon.article,
        date: newPostJSon.date,
        imageAddress: newPostJSon.imageAddress,
        stackOrder: newPostStackOrder || 0
    }

    try {
        if (newPostJSon.mainPost) { //If flagged as main post (will be default on the frontend)
            let dbRes = await MainPost.find();
            if (dbRes.length == 0) {
                dbRes = await MainPost.create(newPost);
                await PostsCounter.findOneAndUpdate({}, { counter : newPostStackOrder + 1 });
                return res.status(201).json(dbRes);
            } else {
                dbRes = await MainPost.find(); //get current main post
                const previousMainPost = dbRes[0];
                const newNormalPost = new Post ({
                    title: previousMainPost.title,
                    subTitle: previousMainPost.subTitle,
                    article: previousMainPost.article,
                    date: previousMainPost.date,
                    imageAddress: previousMainPost.imageAddress,
                    stackOrder: previousMainPost.stackOrder
                });
                await Post.create(newNormalPost); //save current main post as normal post
                await PostsCounter.findOneAndUpdate({}, { counter : newPostStackOrder + 1 });
                const dbResUpdate = await MainPost.findOneAndUpdate(
                    {}, 
                    newPost,
                    { new : true}
                ); //update main post with new post
                return res.status(201).json(dbResUpdate);
            }
        } else { //not flagged as main, keeps the previous main post 
            const dbRes = await Post.create(newPost);
            await PostsCounter.findOneAndUpdate({}, { counter : newPostStackOrder + 1 });
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
            const dbRes = await MainPost.findOneAndUpdate(
                {}, 
                updatedPostJSon, 
                { new: true}
            );
            if (dbRes) {
                return res.status(200).json(dbRes);
            } else {
                return res.status(400).json({
                    'message' : 'Post not updated'
                });
            }
        } else {
            const filter = { _id: `${updatedPostJSon._id}`};
            const dbRes = await Post.findOneAndUpdate(filter, updatedPostJSon, { new: true});
            if (dbRes) {
                return res.status(200).json(dbRes);
            } else {
                return res.status(400).json({
                    'message' : 'Post not updated'
                });
            }
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
        return res.status(400).json({ 'message': 'Request lacks post id'});
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