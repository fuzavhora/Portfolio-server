const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a project (protected route)
router.post('/', auth, async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    technologies: req.body.technologies,
    imageUrl: req.body.imageUrl,
    liveUrl: req.body.liveUrl,
    githubUrl: req.body.githubUrl,
    featured: req.body.featured,
    order: req.body.order
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a project (protected route)
router.patch('/:id', auth, async (req, res) => {

  console.log("id : ", req.params.id);
  
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    Object.keys(req.body).forEach(key => {
      project[key] = req.body[key];
    });

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a project (protected route)
router.delete('/:id', auth, async (req, res) => {  
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await Project.deleteOne({ _id: project._id });

    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 