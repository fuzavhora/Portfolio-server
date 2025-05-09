const express = require('express');
const { createProject, getAllProjects, deleteProject } = require('../controllers/project.controller');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// POST /api/admin/login
router.post('/create-project',verifyToken, createProject);
router.delete('/delete-project',verifyToken, deleteProject);
router.get('/', getAllProjects);

module.exports = router;
