const express = require("express");
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get( "/",  mainController.carrito );
router.get( "/compraFinalizada",  mainController.compraFinalizada );
router.post('/:idProduct' , mainController.addProductFavorite)
router.post('/favorites/:idProduct/remove' , mainController.removeProductFavorite)

module.exports = router;