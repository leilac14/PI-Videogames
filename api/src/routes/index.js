const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genresRoute = require("./genres")
const videogamesRoute = require("./videogames")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/genres", genresRoute)
router.use("/videogames", videogamesRoute)

module.exports = router;
