const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // Looks for the header with the key authorization
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1]; // Separates word "Bearer" from jwt
    // Using jwt.ferify to verify the jwt against the access token i think
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded.UserInfo.username;
        req.isAdmin = decoded.UserInfo.isAdmin;
        next();
    });
};

module.exports = verifyJWT;