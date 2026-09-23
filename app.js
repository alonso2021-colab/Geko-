require('dotenv').config();
const express = require('express');
const path = require('path');

// Rutas
const postRouter = require('./routes/postRoutes');

const app = express();

const port = process.env.PORT || 3000;

// Configurar EJS
app.set('view engine', 'ejs');

// Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));

// JSON
app.use(express.json());

// Programar rutas
app.get('/', (req, res) => {
    res.redirect('/post');
});

app.use('/post', postRouter);

// Levantar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});