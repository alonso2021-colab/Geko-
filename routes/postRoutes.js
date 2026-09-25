const express = require('express')
const router = express.Router()
const post_controller = require('../controllers/postControllers')

router.get('/', post_controller.splash);

router.get('/login', post_controller.login);

router.get('/profile', post_controller.profile);

module.exports = router