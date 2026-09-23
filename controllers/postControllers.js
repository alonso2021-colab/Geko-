const db = require('../config/db');

// Listar todos los post 
// Listar todos los post 
const index = async (req, res) => {
    try {
        const post = []

        res.render('post/index', {
            post,
            title: 'GEKO | Listado de Posts'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}

// FORMULARIO CREAR 
const create = (req, res) => {
    res.render('post/create')
}

module.exports = {
    index,
    create
}