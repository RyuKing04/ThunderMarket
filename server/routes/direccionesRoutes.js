const express =require('express');
const router = express.Router();

const direccionesController = require('../controllers/direccionesController');

router.post('/', direccionesController.create);

router.get('/:id', direccionesController.getDireccionById);

router.get('/usuario/:id', direccionesController.getDireccionesByUser);

module.exports=router;