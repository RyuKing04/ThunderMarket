const express =require('express');
const router = express.Router();

const facturaController = require('../controllers/facturaController');

router.get('/', facturaController.get);

router.get('/:id', facturaController.getById);

router.get('/usuario/:id', facturaController.getByiDUsuario);

router.get('/vendedor/:id', facturaController.getByIdVendedor);

module.exports=router;