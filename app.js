require('dotenv').config();
const express = require('express');
const path = require('path');

// Rutas
const postRouter = require('./routes/postRoutes');
const authRoutes = require('./modules/authRoutes')

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
    res.redirect('/splash');
});

app.get('/login', (req, res) => {
    res.render('post/login');
});

app.get('/profile', (req, res) => {
    res.render('post/profile');
});

app.use('/splash', postRouter);
app.use('/', authRoutes)
app.use('/profile', postRouter)

// Levantar el servidor
app.listen(port, () => {
    console.log(`Servidor arriva en http://localhost:${port}`);
});