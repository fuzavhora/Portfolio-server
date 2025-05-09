const express = require('express');
const { createProject, getAllProjects } = require('../controllers/project.controller');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// POST /api/admin/login
router.post('/create-project',verifyToken, createProject);
router.get('/',verifyToken, getAllProjects);

module.exports = router;
