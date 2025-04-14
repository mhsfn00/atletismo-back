const mongoose = require('mongoose');
const dbConnection = mongoose.connection;
const collectionLimit = 20; // Standard limit for all collections

const deleteObject = async (objectToDelete, collectionName) => {
    let deletedObject = {};

    // Capitalizing the first letter of 'deletedCollection'
    const capitalizedCollectionName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);
    let deletedCollectionName = `deleted${capitalizedCollectionName}`;

    // Iterating through all fields in given object and adding it to generic object
    for (const fieldName in objectToDelete.schema.obj) {
        deletedObject[fieldName] = objectToDelete[fieldName]; 
    }
    deletedObject.deletedAt = Date();

    try {
        const dbRes = await dbConnection.collection(deletedCollectionName).insertOne(deletedObject);
        if (!dbRes.acknowledged) {
            return 'Could not log document';
        }
        const capEnsured = ensureCollectionCap(deletedCollectionName);
        if (!capEnsured) {
            return {
                'dbRes' : dbRes,
                'cap' : `cap was not ensured, ${deletedCollectionName} has over ${collectionLimit} documents`
            }
        }
        return (dbRes); 
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}

const ensureCollectionCap = async (deletedCollectionName) => {
    const collectionCount = await dbConnection.collection(deletedCollectionName).countDocuments();
    if (collectionCount > collectionLimit) {
        const dbRes = await dbConnection.collection(deletedCollectionName)
            .findOneAndDelete({}, { sort: { ['deletedAt']: 1}});
        return dbRes;
    }
    return true;
}

module.exports = {
    deleteObject
}