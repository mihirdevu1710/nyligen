// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/admin');

// User Registration
router.post('/register', userController.registerUser);

// User Login
router.post('/login', userController.loginUser);

module.exports = router;
