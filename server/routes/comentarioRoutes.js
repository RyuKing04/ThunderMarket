const express =require('express');
const router = express.Router();

const comentarioController = require('../controllers/comentarioController');

router.get('/', comentarioController.get);

router.get('/:id', comentarioController.getById);

router.post('/', comentarioController.create);

module.exports=router;