const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/userModel');


authRouter.get('/login', (req, res) => {
    res.render('login_get', {
        error: null,
        success: null
    });
});

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('login_get', {
                error: 'All fields are required',
                success: null
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login_get', {
                error: 'Invalid email or password',
                success: null
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('login_get', {
                error: 'Invalid email or password',
                success: null
            });
        }

        console.log('userId:', user._id);
       
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

         console.log('Cookie', token);

        
        res.cookie('token', token, {
            httpOnly: true,   
            secure: false,    
            maxAge: 60 * 60 * 1000
        });

        return res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        return res.render('login_get', {
            error: 'Something went wrong',
            success: null
        });
    }
});

authRouter.get('/signup' ,(req, res) => {
    res.render('register_get', {
    error: null,
    success: null,
    old: {}
});
});

authRouter.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.render('register_get', {
                error: 'All fields are required',
                success: null
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render('register_get', {
                error: 'Email already in use',
                success: null
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            provider: 'local'
        });

        await newUser.save();

        return res.render('register_get', {
            error: null,
            success: 'Account created successfully! You can now login.'
        });

    } catch (error) {
        console.error(error);
        return res.render('register_get', {
            error: 'Something went wrong',
            success: null
        });
    }
});


authRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = {authRouter};