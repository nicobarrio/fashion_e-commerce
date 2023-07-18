const path = require('path'); 
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const ruta = path.join(__dirname , "../public/products");
        cb( null , ruta ); 
    }, 
    filename: (req, file, cb)=>{
        const newFilename = 'img-' + Date.now() + path.extname(file.originalname);
        cb( null , newFilename ); 
    }
}); 

const upload = multer({ storage /* , fileFilter  */}); 

module.exports = upload; 