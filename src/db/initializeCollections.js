const mongoose = require('mongoose');

async function initialize() {
    try {
        const db = mongoose.connection;
        const collectionsFromDb = await db.listCollections();
        const existingCollectionNames = collectionsFromDb.map((collection) => {
            return collection.name;
        });

        const collections = [
            'about', 'coaches', 'counter', 'events', 'mainPost', 'posts', 'roster', 'users',
            'deletedAbout', 'deletedCoaches', 'deletedEvents', 'deletedPosts', 'deletedRoster',
            'deletedUsers', 'deletedMainPost'
        ];

        for (const collectionName of collections) {
            if (!existingCollectionNames.includes(collectionName)) {
                await db.createCollection(collectionName);
            } else {
                // console.log(`Collection ${collectionName} already exists`);
            }
        }
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = initialize;