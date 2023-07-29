const express=require ('express');
const router=express.Router();

const preguntaController=require('../controllers/preguntaController');

router.post('/', preguntaController.create);

module.exports=router;