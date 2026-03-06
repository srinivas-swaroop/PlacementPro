const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const { authRouter } = require('./routes/auth');
const { dashboardRouter } = require('./routes/dashboard');
const { documentHolder } = require('./routes/docuementHolder');

const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log('Connected to MongoDB');
}).catch((Err) => {
    console.error('Error connecting to MongoDB:', Err);
})

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('home')
})

app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/documents', documentHolder);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})