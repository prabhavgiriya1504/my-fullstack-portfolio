const express = require('express');
const Skill = require('../models/Skill');
const router = express.Router();

// GET all skills or create a new one
router.route('/')
    .get(async (req, res) => {
        try {
            // Sort by category and then by order for display hierarchy
            const skills = await Skill.find({}).sort({ category: 1, order: 1, name: 1 });
            res.status(200).json(skills);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    })
    .post(async (req, res) => {
        try {
            const skill = await Skill.create(req.body);
            res.status(201).json(skill);
        } catch (error) {
            // Handle validation or duplicate key error
            res.status(400).json({ success: false, message: error.message });
        }
    });

// GET, PUT, DELETE a specific skill
router.route('/:id')
    .get(async (req, res) => {
        try {
            const skill = await Skill.findById(req.params.id);
            if (!skill) {
                return res.status(404).json({ success: false, message: 'Skill not found' });
            }
            res.status(200).json(skill);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    })
    .put(async (req, res) => {
        try {
            const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!skill) {
                return res.status(404).json({ success: false, message: 'Skill not found' });
            }
            res.status(200).json(skill);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    })
    .delete(async (req, res) => {
        try {
            const skill = await Skill.findByIdAndDelete(req.params.id);
            if (!skill) {
                return res.status(404).json({ success: false, message: 'Skill not found' });
            }
            res.status(200).json({ success: true, message: 'Skill deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

module.exports = router;
