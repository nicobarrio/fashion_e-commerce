const path = require('path'); 
const multer = require('multer');
const { checkFileType } = require('./helpers');



const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    } 

  } 

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const ruta = path.join(__dirname , "../public/users");
        cb( null , ruta ); 
    }, 
    filename: (req, file, cb)=>{
        const newFilename = 'avatar-' + Date.now() + path.extname(file.originalname);
        cb( null , newFilename ); 
    }
}); 

const upload = multer({ 
  storage
  , fileFilter  }); 

module.exports = upload; 