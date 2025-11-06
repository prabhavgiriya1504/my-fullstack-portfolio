// // server/routes/contact.js
// const express = require('express');
// const router = express.Router();
// const Contact = require('../models/Contact');

// // @route   POST /api/v1/contact
// // @desc    Submit a contact message/suggestion
// router.post('/', async (req, res) => {
//     try {
//         const contact = new Contact(req.body);
//         await contact.save();
//         res.status(201).json({ success: true, message: 'Message sent successfully!' });
//     } catch (err) {
//         // Mongoose validation errors
//         if (err.name === 'ValidationError') {
//             const messages = Object.values(err.errors).map(val => val.message);
//             return res.status(400).json({ success: false, error: messages });
//         }
//         res.status(500).json({ success: false, error: 'Server error: Could not save message.' });
//     }
// });

// module.exports = router;




















const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
// 🚨 ASSUMPTION: You must implement and import your authentication middleware here
const { protect } = require('../middleware/auth'); 

// @route   GET /api/v1/contacts
// @desc    Retrieve all contact messages (Admin View)
// @access  Private (Requires authentication)
router.get('/', protect, async (req, res) => {
    try {
        // Fetch all contacts, sorted by newest first
        const contacts = await Contact.find().sort({ createdAt: -1 });
        
        res.status(200).json({ 
            success: true, 
            count: contacts.length, 
            data: contacts 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error: Could not retrieve messages.' });
    }
});

// @route   POST /api/v1/contact
// @desc    Submit a contact message/suggestion (Public Form)
// @access  Public
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        // Mongoose validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error: Could not save message.' });
    }
});

module.exports = router;