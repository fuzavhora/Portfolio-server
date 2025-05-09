const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true,
    },
    technologies : {
        type: [String],
        required: true,
        trim: true
    },
    imageUrl : {
        type: String,
        required: true,
        trim: true
    },
    description : {
        type: String,
        required: true,
        trim: true
    },
    gitHubUrl : {
        type: String,
        required: true,
        trim: true
    },
    liveUrl : {
        type: String,
        required: true,
        trim: true
    },
}, {timestamps: true});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;