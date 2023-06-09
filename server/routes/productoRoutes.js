const express =require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');

router.get('/', productoController.get);
router.get('/:id', productoController.getById);
router.get('/usuario/:id', productoController.getProductoVendedor);

module.exports=router;