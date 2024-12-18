import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
const rosterRoutes = require('./routes/rosterRoutes.js');
const postsRoutes = require('./routes/postsRoutes.js');
const coachesRoutes = require('./routes/coachesRoutes.js');

async function start () {
    const app = express();
    app.use(express.json());
    const PORT = process.env.PORT || 8000;

    const url = process.env.DB_URL;
    const clientOptions = {
        serverApi: {
            version: '1',
            strict: true,
            deprecationErrors: true
        }
    };

    mongoose.connect(url, clientOptions)
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

    app.use('/api/posts', postsRoutes);
    app.use('/api/roster', rosterRoutes);
    app.use('/api/coaches', coachesRoutes);
   
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

start(); // starting the backend