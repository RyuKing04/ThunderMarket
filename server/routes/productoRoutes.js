const express =require('express');
const router = express.Router();
const upload = require('../controllers/upload');
const productoController = require('../controllers/productoController');

router.get('/', productoController.get);
router.post('/',upload.array('myFile',5), productoController.create);
router.get('/:id', productoController.getById);
router.get('/usuario/:id', productoController.getProductoVendedor);

module.exports=router;