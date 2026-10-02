// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.showLogin);
router.get('/profile', authController.showProfile);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;