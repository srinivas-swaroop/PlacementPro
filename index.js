const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const { authRouter } = require('./routes/auth');
const { dashboardRouter } = require('./routes/dashboard');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/placementPro').then(() =>{
    console.log('Connected to MongoDB');
}).catch((Err) => {
    console.error('Error connecting to MongoDB:', Err);
})

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('home')
})

app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})