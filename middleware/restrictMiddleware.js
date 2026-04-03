const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function restrictMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.redirect('/auth/login');
        }
        
        console.log("Accesing MiddleWare Before setting req.user = user: ", req.headers, req.user);
        req.user = user;  
        console.log("Accesing MiddleWare After setting req.user = user: ", req.headers, req.user);
        next();

    } catch (err) {
        console.error('Invalid token:', err);
        return res.redirect('/auth/login');
    }

}

module.exports = restrictMiddleware;