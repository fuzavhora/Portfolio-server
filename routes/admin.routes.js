const express = require('express');
const {adminLogin, registerAdmin} = require('../controllers/admin.controller');
const router = express.Router();

// POST /api/admin/login
router.post('/login', adminLogin);
router.post('/register', registerAdmin);

module.exports = router;
