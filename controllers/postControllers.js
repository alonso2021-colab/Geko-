const db = require('../config/db');

// Listar todos los post
const index = async (req, res) => {
    try {
        const user = { nombre: 'Usuario', inicial: 'U', plan: 'Free' }

        const rutinaHoy = {
            titulo: 'Full Body',
            descripcion: 'Rutina completa para hoy',
            duracion: '45 min',
            calorias: '320 kcal',
            ejercicios: '8 ejercicios'
        }

        const metas = [
            { label: 'Entrenamientos', value: 3, max: 5, pct: 60 },
            { label: 'Pasos', value: 6000, max: 10000, pct: 60 }
        ]

        const stats = [
            { icon: 'flame', label: 'Calorías', value: '1.200', sub: 'esta semana' },
            { icon: 'pulse', label: 'Ritmo', value: '72 bpm', sub: 'promedio' },
            { icon: 'trend', label: 'Progreso', value: '+8%', sub: 'vs. mes pasado' }
        ]

        const rutinasRecomendadas = [
            { nivel: 'Fácil', nombre: 'Movilidad y core' },
            { nivel: 'Medio', nombre: 'Pierna y glúteo' }
        ]

        const progresoSemanal = [
            { label: 'L', pct: 40 }, { label: 'M', pct: 70 }, { label: 'X', pct: 55 },
            { label: 'J', pct: 80 }, { label: 'V', pct: 30 }, { label: 'S', pct: 90 },
            { label: 'D', pct: 10 }
        ]

        const objetivos = [
            { label: 'Bajar de peso', pct: 45 },
            { label: 'Ganar fuerza', pct: 30 }
        ]

        res.render('post/index', {
            title: 'GEKO | Dashboard',
            user, rutinaHoy, metas, stats,
            rutinasRecomendadas, progresoSemanal, objetivos
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