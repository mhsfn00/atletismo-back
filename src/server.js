import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config'

async function start () { // Function so we dont need to rewrite the database connection code for every request
    const app = express();
    app.use(express.json()); // Telling express to parse the requests using json (i think)
    
    const dbPassword = process.env.MONGO_PASSWORD; // Getting password from .env file using dotenv (gitignore)
    const url = `mongodb+srv://admin:${dbPassword}@cluster0.bueqvia.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(url);

    await client.connect(); // Connecting to mongodb
    const db = client.db('atletismo'); // use atletismo (database) 
    
    app.get('/api/posts', async (req, res) => {
        const posts = await db.collection('posts').find({}).toArray(); // Find all in collection "posts" (looks like an array of objects)
        res.send(posts);
    })
    
    app.get('/api/post/:postId', async (req, res) => {
        const postId = req.params.postId; // postId from request
        const post = await db.collection('posts').findOne({ id: postId }); // id in database | postId from request
        res.json(post);
    });
    
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
}

start(); // "starting the backend"