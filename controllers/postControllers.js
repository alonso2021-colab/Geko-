const db = require('../config/db');


const splash = async (req, res) => {
    res.render('post/splash')
}
 
const login = async(req, res) => {
    res.render('post/login')
}

module.exports = {
    splash,
    login
   
}