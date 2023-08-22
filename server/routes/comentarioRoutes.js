const express =require('express');
const router = express.Router();

const comentarioController = require('../controllers/comentarioController');

router.get('/', comentarioController.get);

router.post('/', comentarioController.create);

router.get('/:id', comentarioController.getById);


module.exports=router;