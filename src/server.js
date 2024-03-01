import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const rosterRoutes = require('./routes/rosterRoutes.js');
const postsRoutes = require('./routes/postsRoutes.js');


async function start () { // Function so we dont need to rewrite the database connection code for every request
    const app = express();
    app.use(express.json()); // Telling express to parse the requests as json (i think)
    const PORT = process.env.PORT || 8000;
    
    const dbPassword = process.env.MONGO_PASSWORD; // Getting password from .env file using dotenv (gitignore)
    const dbKey = process.env.MONGO_KEY;
    const url = `mongodb+srv://admin:${dbPassword}@cluster0.${dbKey}.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(url);
    await client.connect(); // Connecting to mongodb

    const db = client.db('atletismo'); // use atletismo (database) 
    app.set('db', db);

    app.use('/api/posts', postsRoutes);
    app.use('/api/roster', rosterRoutes);
    
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

start(); // starting the backend