const path = require('path');
const { body, check } = require('express-validator'); 




const validateNewProduct = [

    body('nombre')
        .notEmpty().withMessage('El campo "nombre" es obligatorio').bail()
        .isLength({ min: 5 , max: 45}).withMessage('El nombre debe tener entre 5 y 45 caracteres'),
    body('descripcion')
        .isLength({ max: 500, optional:true }).withMessage('La descripción debe tener máximo 500 caracteres'),
    body('precio')
        .notEmpty().withMessage('El campo "precio" es obligatorio').bail()     
        .isNumeric({ message: 'El precio debe ser un número' }).bail()
        .isLength({ max: 11 })
        .withMessage('El precio debe tener máximo 11 caracteres'),
    body('category')
        .notEmpty().withMessage('El campo "category" es obligatorio'),
    body('tipo')
        .notEmpty().withMessage('El campo "tipo" es obligatorio'),
    body('talle')
        .notEmpty().withMessage('El campo "talle" es obligatorio'),
    body('marca')
        .notEmpty().withMessage('El campo "marca" es obligatorio'),
    body('file_img')
        .custom((value, { req }) => {
                                    // CUANDO USAMOS FIELDS CON MULTER, TENEMOS QUE TRABAJAR CON REQ.FILES, Y ESO DEVUELVE UN ARRAY DE OBJETOS, DONDE CADA ATRIBUTO ES UN ARRAY CON EL NAME DEL INPUT
            let file = req.files; //aca probe con req.file tambien 
            let acceptedExtensions = ['.jpg', '.png', '.gif', '.jepg'];
            if ( !file || !file.file_img ) {
                throw new Error('Tienes que subir una imagen');
            } else {
                let fileExtension = path.extname(file.file_img[0].originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
  
          return true;

        }), 

        body('files_img')
            .optional()
          /*   .isArray({ min: 1 })
            .isLength({ max: 4 })
            .withMessage('No se pueden subir más de 4 imágenes').bail() */
            .custom((value, { req }) => {

                const files = req.files ? req.files.files_img : [];
                if (files.length > 0) {
                    if (files.length > 4) {
                        throw new Error('No puedes subir más de 4 imágenes');
                    }
                const allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
                files.forEach((file) => {
                    const extension = path.extname(file.name).toLowerCase();
                    if (!allowedExtensions.includes(extension)) {
                        throw new Error('Las imágenes deben ser de formato JPG, JPEG, PNG o GIF');
                    }
                });
            }
            return true;
        })
]

module.exports = validateNewProduct; 