const express=require ('express');
const router=express.Router();

const preguntaController=require('../controllers/preguntaController');

router.post('/', preguntaController.create);
router.post('/respuesta', preguntaController.createRespuesta);

module.exports=router;