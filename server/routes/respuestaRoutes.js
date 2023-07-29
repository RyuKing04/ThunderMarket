const express=require ('express');
const router=express.Router();

const respuestaController=require('../controllers/respuestaController');

router.post('/', respuestaController.createRespuesta);

module.exports=router;