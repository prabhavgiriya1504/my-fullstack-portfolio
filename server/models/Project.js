const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: [String], // Array of strings (e.g., ['Next.js', 'Tailwind', 'MongoDB'])
        required: true
    },
    liveUrl: {
        type: String,
        default: 'N/A'
    },
    githubUrl: {
        type: String,
        default: 'N/A'
    },
    imageUrl: {
        type: String,
        default: '/placeholder-project.webp' 
    },
    dateCompleted: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);