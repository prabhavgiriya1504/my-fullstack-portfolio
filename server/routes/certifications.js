const express = require('express');
const Certification = require('../models/Certification');
const router = express.Router();

// GET all certifications or create a new one
router.route('/')
    .get(async (req, res) => {
        try {
            const certifications = await Certification.find({}).sort({ dateIssued: -1 });
            res.status(200).json(certifications);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    })
    .post(async (req, res) => {
        try {
            const certification = await Certification.create(req.body);
            res.status(201).json(certification);
        } catch (error) {
            // Handle validation error (e.g., missing required field)
            res.status(400).json({ success: false, message: error.message });
        }
    });

// GET, PUT, DELETE a specific certification
router.route('/:id')
    .get(async (req, res) => {
        try {
            const certification = await Certification.findById(req.params.id);
            if (!certification) {
                return res.status(404).json({ success: false, message: 'Certification not found' });
            }
            res.status(200).json(certification);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    })
    .put(async (req, res) => {
        try {
            const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, {
                new: true, // Return the updated document
                runValidators: true // Run schema validation
            });
            if (!certification) {
                return res.status(404).json({ success: false, message: 'Certification not found' });
            }
            res.status(200).json(certification);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    })
    .delete(async (req, res) => {
        try {
            const certification = await Certification.findByIdAndDelete(req.params.id);
            if (!certification) {
                return res.status(404).json({ success: false, message: 'Certification not found' });
            }
            res.status(200).json({ success: true, message: 'Certification deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

module.exports = router;