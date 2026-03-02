const express = require('express');
const dashboardRouter = express.Router();

const restrictMiddleware = require('../middleware/restrictMiddleware');

dashboardRouter.get('', restrictMiddleware, (req, res) => {
    res.render('dashboard', { user: req.user });
});

module.exports = { dashboardRouter };