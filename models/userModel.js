const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        // Only required for local users
    },

    googleId: {
        type: String,
        unique: true,
        sparse: true
    },

    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },

    avatar: {
        type: String
    },

    role: {
        type: String,
        default: 'student'
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});



module.exports = mongoose.model('User', userSchema);