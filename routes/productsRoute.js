const express = require("express");
const router = express.Router();
/* const path = require('path'); 
const multer = require('multer'); */
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');

/******* Middlewares ********/
const uploadFile = require('../middlewares/productsMulterMiddleware');
const validationProduct = require('../middlewares/validationNewProduct');


/******* CRUD  *******/
router.get('/listarProducts' , productsController.search);
router.get('/ventas/sale_by_product' , productsController.sale_by_product_list);
router.post('/ventas/sale_by_product' , productsController.crearFactura);
router.get('/ventas/sale_by_user' , productsController.sale_by_user_list);

router.get( "/", productsController.index );
router.get( "/crear", productsController.crearProducto );
router.get('/:id' , productsController.detail); 

router.post('/', 
     uploadFile.fields([
        { name: 'file_img', maxCount: 1 },
        { name: 'files_img', maxCount: 4 }]),
        validationProduct,
        productsController.store2);

router.get('/:id/editar' , authMiddleware , productsController.edit); //falta el middleware

router.put('/:id' , uploadFile.fields([
                { name: 'file_img', maxCount: 1 },
                { name: 'files_img', maxCount: 4 }]),
                validationProduct,
                productsController.update2);

router.delete('/:id' , productsController.delete2); 


router.get('/list/paginado', productsController.listPaginado)


module.exports = router; 