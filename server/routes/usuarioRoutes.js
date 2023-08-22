const express =require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAll);

router.get('/:id', usuarioController.getById);

router.get('/vendedor', usuarioController.getVendedor);

router.post('/registrar', usuarioController.register);

router.post('/login', usuarioController.login);

router.put('/cambiarEstado/:id', usuarioController.cambiarEstado);

module.exports=router;