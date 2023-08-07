const express=require ('express');
const router=express.Router();

const preguntaController=require('../controllers/preguntaController');


//Obtener listado de preguntas
//Obtener una pregunta por id
router.get('/:id', preguntaController.getPreguntaProducto);
router.post('/', preguntaController.create);

module.exports=router;