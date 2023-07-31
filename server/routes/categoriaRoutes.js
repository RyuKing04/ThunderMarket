//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const categoriaController = require("../controllers/categoriaController");

//Definición de rutas para generos
router.get("/", categoriaController.get);

router.get("/:id", categoriaController.getById);

module.exports = router;