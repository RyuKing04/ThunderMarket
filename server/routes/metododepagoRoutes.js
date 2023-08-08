const express = require('express');
const router = express.Router();

const metodoDePagoController = require('../controllers/metododepagoController');


router.post('/', metodoDePagoController.create);
router.get('/usuario/:id', metodoDePagoController.getMetodoDePagoByUser);
router.get('/:id', metodoDePagoController.getMetodoDePagoById);

module.exports = router;