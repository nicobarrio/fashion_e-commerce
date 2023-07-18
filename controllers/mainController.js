// OBJETOS LITERAL DE LAS RUTAS PARA EL LINK CORRESPONDIENTE A CADA EJS/HTML
/* const rutas = {
    home: "/css/home.css", 
    carrito: "css/carrito.css"
} */

const { Association } = require("sequelize");
const { Sequelize } = require("../database/models");
const db = require("../database/models"); // SIEMPRE REQUERIR LA BASE DE DATOS !! esta exportada como db tmb
const Op = Sequelize.Op;



const mainController = {
    index: (req, res)=>{
        res.render('home')
    },
    carrito: async(req, res)=>{ 

        if (!req.session.userLogged) {
           return res.redirect('user/login')
        }

        const user = await db.User.findByPk(req.session.userLogged.iduser, {
            include: [{ 
                model: db.Product, 
                through: db.Favorite_product,
                as: 'products'
            }]
        });

        //return res.json(user)
        res.render('carrito')
    }, 

    addProductFavorite: async(req, res)=>{

        //agregar a favoritos esta logica pero se puede modificar

        const product = await db.Product.findByPk(req.params.idProduct); 
        const user = req.session.userLogged ? await db.User.findByPk(req.session.userLogged.iduser) : null;
        // hacerlo con session, solo ir a la DB si necesito alguna info que no tengo en session
        if (!user) {
            return res.send('el usuario no esta loggeado')
        }
        
        const relacionCreada = await user.addProduct(product) //aca estoy usando la instancia del usuario
        //const relacionCreada2 = await product.addUser(req.session.userLogged.iduser) probar para

        return res.redirect('/user/favorites/'+ user.iduser)
        //return res.json(relacionCreada)
    }, 

    compraFinalizada: (req, res) =>{
        return res.render('compraFinalizada')
    },
    removeProductFavorite: async (req, res) => {
        
        const product = await db.Product.findByPk(req.params.idProduct);
        const user = req.session.userLogged ? await db.User.findByPk(req.session.userLogged.iduser) : null;
    
        if (!user) {
            return res.send('El usuario no está logueado');
        }
    
        const relacionEliminada = await db.Favorite_product.destroy({
            where: {
                user_id: user.iduser,
                product_id: product.idProduct
            }
        });
    
        return res.redirect('/user/favorites/' + user.iduser);
    }
    
    
}


module.exports = mainController; 