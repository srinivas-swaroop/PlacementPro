const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    companyId: String,
    companyName: String,
    role: String,
    status: {
        type: String,
        default: "Applied"
    },
    stages: {
        type: Object,
        default: {}
    }
});

const placementTrackerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    applications: [applicationSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("PlacementTracker", placementTrackerSchema);