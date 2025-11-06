const mongoose = require('mongoose');

// Defines the structure for a Certification document
const CertificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Certification title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    issuer: {
        type: String,
        required: [true, 'The issuing organization is required'],
        trim: true,
        maxlength: [80, 'Issuer name cannot be more than 80 characters']
    },
    dateIssued: {
        type: Date,
        required: [true, 'Date issued is required']
    },
    credentialId: {
        type: String,
        trim: true,
        default: ''
    },
    url: {
        type: String,
        trim: true,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Certification', CertificationSchema);
