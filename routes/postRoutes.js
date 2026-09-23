const express = require('express')

const router = express.Router()

const post_controller = require('../controllers/postControllers')

// Index: Listar todos los post 

router.get('/', post_controller.index);


module.exports = router