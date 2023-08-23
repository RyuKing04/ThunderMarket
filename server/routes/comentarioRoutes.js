const express =require('express');
const router = express.Router();

const comentarioController = require('../controllers/comentarioController');

router.get('/', comentarioController.get);

router.post('/', comentarioController.create);

router.get('/mejores-vendedores', comentarioController.getMejoresVendedoresCalificados);


router.get('/:id', comentarioController.getById);




module.exports=router;