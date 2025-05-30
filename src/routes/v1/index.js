const express = require('express');
const router = express.Router();

// Import nested routes
const authRoutes = require('./auth/auth.routess');

const fileRoutes = require('./files/file.routess');
// All auth routes start with /auth
router.use('/auth', authRoutes);

// All file routes start with /files    
router.use('/files', fileRoutes);
// Health check route

module.exports = router;