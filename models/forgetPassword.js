const mongoose = require('mongoose');

const forgetPassSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },

    otp: {
        type: String,
        required: true
    },

    expireAt: {
        type: Date,
        default: () => Date.now() + 10 * 60 * 1000,
        index: { expires: 0 }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ForgetPass', forgetPassSchema);