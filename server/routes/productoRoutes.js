const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
});

const productoController = require('../controllers/productoController');

router.get('/', productoController.get);
router.post('/', upload.array('myFile', 5), productoController.create);
router.put('/:id',  upload.array('myFile', 5), productoController.update);
router.get('/:id', productoController.getById);
router.get('/usuario/:id', productoController.getProductoVendedor);

module.exports = router;






// const express =require('express');
// const multer = require('multer');
// const router = express.Router();
// const upload = require('../controllers/upload');
// const productoController = require('../controllers/productoController');

// router.get('/', productoController.get);
// router.post('/',upload.array('myFile',5), productoController.create);
// router.get('/:id', productoController.getById);
// router.get('/usuario/:id', productoController.getProductoVendedor);

// module.exports=router;