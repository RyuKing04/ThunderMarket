const express =require('express');
const router = express.Router();

const facturaController = require('../controllers/facturaController');

router.get('/', facturaController.get);

router.post('/', facturaController.create)

router.get('/:id', facturaController.getById);

router.put('/:id', facturaController.updateEstado);

router.get('/productos-mas-vendidos/:id', facturaController.getClienteMasCompras);

router.get('/usuario/:id', facturaController.getByiDUsuario);

router.get('/vendedor/:id', facturaController.getByIdVendedor);

router.get("/Producto/:mes", facturaController.getProductosVendidosDelMes)

//ruta para este getProductosMasVendidosVendedo
router.get("/productos/:id", facturaController.getProductosMasVendidosVendedor)


module.exports=router;