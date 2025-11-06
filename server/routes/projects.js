// server/routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // NOTE: Check the path here, should be '../models/Project'

// @route   GET /api/v1/projects
// @desc    Get all projects (READ All)
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ dateCompleted: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/v1/projects/:id
// @desc    Get single project (READ One)
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        // Handle case where ID format is invalid
        if (err.kind === 'ObjectId') {
             return res.status(400).json({ error: 'Invalid project ID format' });
        }
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   POST /api/v1/projects
// @desc    Create a new project (CREATE)
router.post('/', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// @route   PUT /api/v1/projects/:id
// @desc    Update a project by ID (UPDATE)
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Rerun validation on update
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found for update' });
        }

        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// @route   DELETE /api/v1/projects/:id
// @desc    Delete a project by ID (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found for deletion' });
        }

        res.json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;