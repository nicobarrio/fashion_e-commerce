const path = require('path');
const db = require("../../database/models"); // SIEMPRE REQUERIR LA BASE DE DATOS !! esta exportada como db tmb
//const Op = Sequelize.Op;
const User = db.User;


const apiUsersController = {
    list: async (req, res, next) => {
        try{

            const { page = 1, size = 2 } = req.query;

            const { count , rows: users} = await User.findAndCountAll({
                limit: +size,
                offset: (+page-1) * (+size),
                attributes: ['iduser', 'name', 'last_name', 'email'],
            });

            const totalPages = Math.ceil(count / size);
            const currentPage = +page;

             // crear función para generar el link tanto para next como para previous
             const buildPageUrl = (page) =>
             `${req.protocol}://${req.get('host')}/api/users?page=${page}&size=${size}`;

             const nextUrl = currentPage < totalPages ? buildPageUrl(currentPage + 1) : null;
             const previousUrl = currentPage > 1 ? buildPageUrl(currentPage - 1) : null;

            return res.status(200).json( { 
                count,
                nextUrl,
                previousUrl,
                users: users.map((user) => ({
                    id: user.iduser ,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    detail: `${req.protocol}://${req.get('host')}/api/users/${user.iduser}`    
                }))
            } );
        }
       catch(err){
        next(err)
       }
    }, 

    detail: async( req, res, next )=>{
        try{
            const user = await User.findByPk(req.params.id, 
                { attributes: { exclude: ['password', 'is_admin'] } });
            return res.json({
                user, 
                image: `/users/${user.avatar}`
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = apiUsersController; 