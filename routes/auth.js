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


const forgetPassModel = require('../models/forgetPassword');
const mail = require('../controllers/mail');

function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

authRouter.get('/forget', (req,res)=>{
    res.render('forgetEJS',{
        error : null,
        success : null,
    });
})

// authRouter.post('/forget', async (req, res)=>{
//     const {email} = req.body.email;
//     const existingUser = await User.findOne({email});

//     if(!existingUser){
//         return res.render('forgetEJS',{
//             error : 'Account Isnt Registered in DB, Register',
//             success : null
//         })
//     } else{
//         const token = //random token generation

//         forgetPassModel.findOneAndUpdate({email}, {token : token}, true);
//         mail.sendMail(email, token);

//     }
// })

authRouter.post('/forget', async (req, res)=>{
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if(!existingUser){
        return res.render('forgetEJS',{
            error : 'Account not registered',
            success : null
        });
    }

    const otp = generateOTP();

    // delete old OTPs
    await forgetPassModel.deleteMany({ email });

    // save new OTP
    await forgetPassModel.create({
        email,
        otp
    });

    await mail.sendMail(email, otp);

    res.render('forgetEJS',{
        error : null,
        success : 'OTP sent to your email'
    });
});


// authRouter.post('/forgetCheck', async (req, res)=>{
//     const email = req.body.email;
//     const token = req.body.token;
//     const password = req.body.password;

//     const existingUser = await forgetPassModel.findOne({email});

//     if(existingUser.token === token){
//         User.findOneAndUpdate({email}, {password : password}, true);

//         res.render('forgetEJS', {
//             error : null,
//             success : 'Updated Password go Back and LogIn'
//         })
//     }
// })

authRouter.post('/forgetCheck', async (req, res)=>{
    const { email, otp, password } = req.body;

    const record = await forgetPassModel.findOne({ email, otp });

    if(!record){
        return res.render('forgetEJS',{
            error : 'Invalid or expired OTP',
            success : null
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
        { email },
        { password: hashedPassword }
    );

    // delete OTP after use
    await forgetPassModel.deleteMany({ email });

    res.render('forgetEJS', {
        error : null,
        success : 'Password updated successfully'
    });
});


module.exports = {authRouter};