const bcryptjs = require('bcryptjs'); 
const { validationResult } = require('express-validator'); 
//const User = require('../models/UserModels'); 


// SEQUELIZE 
const { Association } = require("sequelize");
const { Sequelize } = require("../database/models");
const db = require("../database/models"); // SIEMPRE REQUERIR LA BASE DE DATOS !! esta exportada como db tmb
const Op = Sequelize.Op;

const userController = {
    
    login:(req, res) => {
            // una vez que se registra yo renderizaria nuevamente al login pero con los datos del register
        return res.render('users/login')
    }, 

    // PROCESO DE REGISTER DE NUEVOS USUARIOS AL SISTEMA     // FALTA AGREGAR PARA LOS PERFILES ADMIN
    processRegister: (req, res)=>{

        const resultValidation = validationResult(req); 

        if ( !resultValidation.isEmpty() ) {  // primero verificamos si hay errores
            return res.render('users/login' , {
                errors: resultValidation.mapped() , 
                old: req.body
            });
        }

       // No Hay errores...
        let userInDB = User.findByField('email' , req.body.email);
        
        // preguntamos si existe el usuario en la base de datos , si existe es porque ya esta registado
        if ( userInDB ) {   
            return res.render('users/login', {
                errors: {
                    email:{
                        msg: 'Este email ya está registrado'
                    }
                }, 
                old: req.body
            });
        }
            // si no esta registrado, preparamos la info para enviar: 
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password , 10), 
            passConfirm: bcryptjs.hashSync(req.body.passConfirm , 10), // o hacer un delete de passConfirm
            imagen: req.file ? req.file.filename : 'imagenUsuario.png'
        };

        let userCreated = User.create(userToCreate);

        return res.send(userCreated)
        //res.redirect('user/profile/' + user.id ) 
    },

    processRegister2: async(req, res)=>{

        try{

        const resultValidation = validationResult(req); 

        if ( !resultValidation.isEmpty() ) {  // primero verificamos si hay errores
            return res.render('users/login' , {
                errors: resultValidation.mapped() , 
                old: req.body
            });
        }

       // No Hay errores...
        let userInDB =  await db.User.findOne({
            where: {
                email : req.body.email
            }
        });

        // preguntamos si existe el usuario en la base de datos , si existe es porque ya esta registado
        if ( userInDB ) {   
            return res.render('users/login', {
                errors: {
                    email:{
                        msg: 'Este email ya está registrado'
                    }
                }, 
                old: req.body
            });
        }

        // sino esta registrado, creamos el nuevo usuario
        const passwordHasheada = await bcryptjs.hashSync(req.body.password , 10);

        const newUser = await db.User.create({
            name : req.body.name, 
            last_name: req.body.lastName,
            email: req.body.email, 
            password: passwordHasheada,
            avatar: req.file ? req.file.filename : 'imagenUsuario.png', 
            is_admin: 1 //ver aca si va 0 o 1
        })
        //********* Faltaria validar de si es admin poder editar o eliminar un producto/
        //return res.json(newUser)
        return res.redirect('user/login') // debe loguearse ahora 
    }
    catch(err){
        console.log(err)
    }
    },

    processLogin: (req, res)=>{
        const resultValidation = validationResult(req); 

        if ( !resultValidation.isEmpty() ) {  // primero verificamos si hay errores
            return res.render('users/login' , {
                errors: resultValidation.mapped() , 
                old: req.body
            });
        }
        //si no hay errores 
        //verificar si el mail y la contraseña se corresponde con un usuario ya registrado(en la DB)
        let userInDB = User.findByField('email' , req.body.emailLogin);

        if( !userInDB ){
            return res.render('users/login' , {
                    errors: {
                        emailLogin: {
                            msg: 'Este mail no se encuentra registrado'
                        }
                } , 
                old: req.body
            });
        }
        
        let isOkPassword = bcryptjs.compareSync(req.body.passwordLogin , userInDB.password); 

        if ( isOkPassword ) { //si la contraseña ingresada coincide con la contraseña hasheada registrada del usuario
            delete userInDB.password;
            delete userInDB.passConfirm;
            
            req.session.userLogged = {
                email: userInDB.email, 
                iduser: userInDB.iduser,
                avatar: userInDB.avatar, 
                is_admin: userInDB.is_admin
            };

            if ( req.body.recordarme ) {
                res.cookie('userEmail' , req.body.emailLogin , { maxAge: (1000*60)*60 } )
            }

            res.redirect('/user/profile')
        }else{
            return res.render('users/login' , {
                errors: {
                    emailLogin: {
                        msg: 'Credenciales inválidas'
                    }
                }
            });
        }
    },

    processLogin2: async(req, res)=>{

        try{

        
        const resultValidation = validationResult(req); 

        if ( !resultValidation.isEmpty() ) {  // primero verificamos si hay errores
            return res.render('users/login' , {
                errors: resultValidation.mapped() , 
                old: req.body
            });
        }
        //si no hay errores 
         //verificar si el mail y la contraseña se corresponde con un usuario ya registrado(en la DB)
         let userInDB = await db.User.findOne({
            where: {
                email: req.body.emailLogin
            }
         });

        if( !userInDB ){
            return res.render('users/login' , {
                    errors: {
                        emailLogin: {
                            msg: 'Este mail no se encuentra registrado'
                        }
                } , 
                old: req.body
            });
        }

        let isOkPassword = bcryptjs.compareSync(req.body.passwordLogin , userInDB.password); 


        if ( isOkPassword ) { //si la contraseña ingresada coincide con la contraseña hasheada registrada del usuario
            delete userInDB.password;
            //delete userInDB.passConfirm;
            //req.session.userLogged = userInDB;
            req.session.userLogged = {
                iduser: userInDB.iduser,
                is_admin: userInDB.is_admin,
                name: userInDB.name,
                email: userInDB.email,
                avatar: userInDB.avatar
            };

            if ( req.body.recordarme ) {
                res.cookie('userEmail' , req.body.emailLogin , { maxAge: (1000*60)*60 } )
            }

            res.redirect('/user/profile')
        }else{
            return res.render('users/login' , {
                errors: {
                    emailLogin: {
                        msg: 'Credenciales inválidas'
                    }
                }
            });
        }
        }
        catch(err){
            console.log(err)
        }
    },
    profile: async( req, res ) => {
        try{
        //return res.send(req.session.userLogged)
        let user = await db.User.findByPk(req.session.userLogged.iduser);
        if (user) {
            const userInDB = await db.User.findByPk(user.iduser); 
            return res.render('users/profile', { user: userInDB })
        }else{
            return res.redirect('/user/login');
        }
        }
        catch(err){
            console.log(err)
        }
        //res.render('users/profile' , { user })
        
    }, 

    logout: (req, res)=>{
        res.clearCookie('userEmail'); 
        req.session.destroy(); 
        return res.redirect('/user/login'); 
    }, 

    edit: async(req, res)=>{

        try{

        
        //ya hice la validacion de req.session.userLogged con el MD de app. 
        // entonces req.session.userLogged va a existir si o si si ingresa a esta pagina.

        let user = req.session.userLogged;
        if (user) {
            const userInDB = await db.User.findByPk(user.iduser); 
            return res.render('users/edit', { user: userInDB })
        }else{
            return res.redirect('/user/login');
        }

        }
        catch(err){
            console.log(err)
        }
    }, 

    update: async(req, res)=>{

        try{

        
        let user = req.session.userLogged
        const resultValidation = validationResult(req); 

        if ( !resultValidation.isEmpty() ) {  // primero verificamos si hay errores
            return res.render('users/edit' , {
                errors: resultValidation.mapped() , 
                old: req.body, 
                user
            });
        }

    
        const passwordHasheada = await bcryptjs.hashSync(req.body.password , 10);

        const updatedUser = await db.User.update({
            name : req.body.name, 
            last_name: req.body.lastName,
            email: user.email, 
            password: passwordHasheada,
            avatar: req.file ? req.file.filename : 'imagenUsuario.png', 
            is_admin: 1
        },{
            where: {
                iduser: user.iduser
            }
        })
        
        req.session.userLogged = await db.User.findOne({
            where: {
                iduser: user.iduser
            }
        });

       return res.redirect('/user/profile')
        }
        catch(err){
            console.log(err)
        }
    }, 


    delete: async(req, res)=>{

        try{

        
        let user = req.session.userLogged;

        
        await db.Sale_by_user.destroy({
            where: {
              user_id: user.iduser
            }
          });

        await db.Favorite_product.destroy({
            where:{
                user_id: user.iduser
            }
        });
        


        const userDeleted = await db.User.destroy({
            where:{
                iduser : user.iduser
            }
        })
        res.clearCookie('userEmail'); 
        req.session.destroy(); 

        return res.redirect('/')
        }
        catch(err){
            console.log(err)
        }
    }, 

    getFavoriteProducts: async(req, res)=>{

        try{
            const userSession = req.session.userLogged; 

            if (userSession) {
                const user = await db.User.findByPk( userSession.iduser , { 
                    include: [
                        {
                            model: db.Product,
                            as: 'products',
                            include: [
                                {
                                    model: db.Image_product,
                                    as: 'imageProduct', 
                                }
                            ]
                        }
                    ]
                });
                const products = user.products;
                return res.render('users/favoriteProducts', { user, products });
            }else{
                return res.redirect('/user/login');
            }

            

        }
        catch(err){
            console.log(err)
        }


    }


}


module.exports = userController; 