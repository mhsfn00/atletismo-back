const User = require('../models/User.js');

const getUser = async (req, res) => {        
    if (!req?.body) {
        return res.status(400).json({ 'message': 'Bad request' });
    } else {
        return res.status(200).json({ 'message' : 'Success'});
    }
}


module.exports = {
    getUser
}