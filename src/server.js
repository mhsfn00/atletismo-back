import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config'

async function start () { // Function so we dont need to rewrite the database connection code for every request
    const app = express();
    app.use(express.json()); // Telling express to parse the requests using json (i think)
    
    const dbPassword = process.env.MONGO_PASSWORD; // Getting password from .env file using dotenv (gitignore)
    const dbKey = process.env.MONGO_KEY;
    const url = `mongodb+srv://admin:${dbPassword}@cluster0.${dbKey}.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(url);

    await client.connect(); // Connecting to mongodb
    const db = client.db('atletismo'); // use atletismo (database) 
    
    app.get('/api/posts', async (req, res) => {
        const posts = await db.collection('posts').find({}, { limit: 5 }).toArray(); // Collection posts contains all posts not tagged as mainPost
        const mainPost = await db.collection('mainPost').findOne({}); // Finds the only main post, its own collection (mainPost), capped to 1 object
        posts.unshift(mainPost); // mainPost in the first position of posts
        res.json(posts);
    });
    
    app.get('/api/post/:postId', async (req, res) => {
        const postId = req.params.postId; // postId from request

        const post = await db.collection('mainPost').findOne({ id: postId }) ? // Checking for the post id in the mainPost collection first
            await db.collection('mainPost').findOne({ id: postId }) : await db.collection('posts').findOne({ id: postId });  

        res.json(post);
    });

    app.post('/api/editPost', async (req, res) => {
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
    
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
}

start(); // "starting the backend"