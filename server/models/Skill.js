const mongoose = require('mongoose');

// Defines the structure for a Skill document
const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        unique: true,
        trim: true,
        maxlength: [60, 'Skill name cannot be more than 60 characters']
    },
    proficiency: {
        type: String,
        required: [true, 'Proficiency level is required'],
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        default: 'Intermediate'
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        default: 'General'
    },
    order: {
        type: Number,
        default: 0
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Skill', SkillSchema);
