const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/db');

const ID__ROL_ADMIN = 1;
const ID_ROL_CLIENTE = 2;


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, nombre_usuario, correo, numero, contrasena } = req.body;

    if (!nombre || !apellido || !nombre_usuario || !correo || !numero || !contrasena) {
      return res.status(400).json({ success: false, message: 'Completa todos los campos.' });
    }

    const [correoExiste] = await pool.query('SELECT id_usuario FROM usuarios WHERE correo = ?', [correo]);
    if (correoExiste.length > 0) {
      return res.status(409).json({ success: false, message: 'Ese correo ya está registrado.' });
    }

    const [usuarioExiste] = await pool.query('SELECT id_usuario FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
    if (usuarioExiste.length > 0) {
      return res.status(409).json({ success: false, message: 'Ese nombre de usuario ya está en uso.' });
    }

    const [numeroExiste] = await pool.query('SELECT id_usuario FROM usuarios WHERE numero = ?', [numero]);
    if (numeroExiste.length > 0) {
      return res.status(409).json({ success: false, message: 'Ese número de teléfono ya está registrado.' });
    }

    const contrasena_hash = await bcrypt.hash(contrasena, 10);

    await pool.query(
      `INSERT INTO usuarios (id_rol, nombre, apellido, correo, contrasena_hash, numero, nombre_usuario)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [ID_ROL_CLIENTE, nombre, apellido, correo, contrasena_hash, numero, nombre_usuario]
    );

    await pool.query(
      `INSERT INTO usuarios (id_rol, nombre, apellido, correo, contrasena_hash, numero, nombre_usuario)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [ID__ROL_ADMIN, nombre, apellido, correo, contrasena_hash, numero, nombre_usuario]
    );
    return res.json({ success: true, message: 'Cuenta creada correctamente.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error del servidor.' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ success: false, message: 'Completa correo y contraseña.' });
    }

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos.' });
    }

    const usuario = rows[0];
    const coincide = await bcrypt.compare(contrasena, usuario.contrasena_hash);

    if (!coincide) {
      return res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos.' });
    }

    return res.json({ success: true, message: 'Inicio de sesión exitoso.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error del servidor.' });
  }
});

module.exports = router;