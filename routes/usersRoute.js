const express = require("express");
const router = express.Router();

/****** CONTROLLERS *******/
const userController = require('../controllers/usersController');

/***** MIDDLEWARES *****/
const uploadFileUser = require('../middlewares/usersMulterMiddleware'); 
const validationsRegister = require('../middlewares/validationRegisterUsers'); 
const validationLogin = require('../middlewares/validationLoginUser'); 
const validationEdit = require('../middlewares/validationEditUser'); 
const guestMiddleware = require('../middlewares/guestMiddleware'); 
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/login", guestMiddleware ,userController.login);

/***** PROCESAR EL LOGIN DE INGRESO DE USUARIOS YA REGISTRADOS *****/
router.post('/login', validationLogin ,userController.processLogin2);

/***** PROCESAR EL REGISTRO DE NUEVOS USUARIOS ****/
router.post('/' ,  uploadFileUser.single('userImage') , validationsRegister ,  userController.processRegister2);

/********* ACCEDER AL PERFIL DEL USUARIO ***********/
router.get('/profile' ,  authMiddleware , userController.profile)

router.get('/logout' , userController.logout)

/***********  EDITAR EL PERFIL DEL USUARIO  *************/
router.get('/edit' , authMiddleware ,userController.edit); 
router.post('/edit' , uploadFileUser.single('userImage') ,validationEdit , userController.update);

/********  ELIMINAR EL USUARIO *********/
router.delete('/delete', userController.delete); 



/********  PROBANDO LAS TABLAS SECUNDARIAS *********/

router.get('/favorites/:iduser', userController.getFavoriteProducts);

module.exports = router; 