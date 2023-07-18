const path = require('path');
const db = require("../../database/models"); // SIEMPRE REQUERIR LA BASE DE DATOS !! esta exportada como db tmb
//const Op = Sequelize.Op;
const Product = db.Product;


const apiProductsController = {
    list : async(req, res, next)=>{
        try {
            // endopoint: http://localhost:3030/api/products?page=0&size=10

            //const { page = 1, size = 10 } = req.query;
            const { page, size } = req.query;

            // Validar que page y size sean números enteros positivos
            if (page && size) {
                if (isNaN(page) || isNaN(size) || page <= 0 || size <= 0) {
              return res
                .status(400)
                .json({
                  error:
                    "Los parámetros de página y tamaño deben ser números enteros positivos mayores a cero.",
                    example: "http://localhost:3030/api/products?page=1&size=10" , 
                    status: 400
                });
            }
            }
            

            // Traerme agrupados la cantidad de productos por categoria
            const response = await db.Category_product.findAll({
                attributes: [
                    'category', 
                    [db.sequelize.fn('COUNT', 'Product.idProduct'), 
                    'count']
                ],
                include: [{
                    model: db.Product,
                    as: 'product',
                    attributes: []
                }],
                group: ['category']
            })

            // Armar la paginacion con el metodo findAndCountAll
            const { count , rows: products} = await Product.findAndCountAll({
                //limit: +size,
                limit: size ? +size : null,
                //offset: (+page-1) * (+size),
                offset: size ? (+page - 1) * (+size) : null,
                attributes: ['idProduct', 'name', 'description'],
            });

            const totalCount = await Product.count();
            const totalPages =  size ? Math.ceil(totalCount / size) : 1;
            const currentPage = page ? +page : 1;

            // Validar CUANDO NO HAY PRODUCTOS PARA MOSTRAR SEGUN LOS PARAMETROS PASADOS
            if ( !products.length || (currentPage === 0 || totalPages === 0)) {
                return res.status(404).json({
                    error: 'No hay productos para mostrar con estos parámetros',
                    status: 404
                });
            }

            // crear función para generar el link tanto para next como para previous
            const buildPageUrl = (page) =>
            `${req.protocol}://${req.get('host')}/api/products?page=${page}&size=${size}`;
    
            const nextUrl = currentPage < totalPages ? buildPageUrl(currentPage + 1) : null;
            const previousUrl = currentPage > 1 ? buildPageUrl(currentPage - 1) : null;

            // RESPUESTA EXITOSA
            return res.status(200).json({
                count, 
                countByCategory: response, 
                nextUrl,
                previousUrl,
                products: products.map(p => ({
                    id: p.idProduct, 
                    name: p.name,
                    description: p.description, 
                    link: `${req.protocol}://${req.get('host')}/api/products/${p.idProduct}`
                })),
                status: 200
            })
            
        }catch (error) {
            next({status: 500, message: 'Error interno del servidor'})
        }
    }, 
    detail: async(req, res) => {
        try{
            const product = await Product.findByPk(req.params.id, {
                include: ['category_product', 'clothes_type', 'imageProduct', 'brand_product', 'waist']
            });
            return res.json({
                product: {
                    id: product.idProduct, 
                    name: product.name, 
                    description: product.description, 
                    price: product.price, 
                    image: `${req.protocol}://${req.get('host')}/products/${product.imageProduct.image_route}`,
                    category: product.category_product.category, 
                    type: product.clothes_type.type,
                    brand: product.brand_product.brand_name, 
                    waist: product.waist.waits 
                }
            })
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = apiProductsController; 