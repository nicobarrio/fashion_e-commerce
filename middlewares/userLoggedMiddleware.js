//const User = require('../models/UserModels');
const { Sequelize } = require("../database/models");
const db = require("../database/models");

const userLogged = async(req, res, next)=>{
    
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail; 
    if(emailInCookie){
        let userFromCookie = await db.User.findOne({
           where: {
               email: emailInCookie
           }
        });

        if ( userFromCookie ) {
            req.session.userLogged = userFromCookie; //no hay que borar la contraseña?
        }
    }
    
    if ( req.session.userLogged  ) {

        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged; 
    }
    next();
}

module.exports = userLogged; 