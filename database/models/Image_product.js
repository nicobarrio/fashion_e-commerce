module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Image_product'; 

    const col = {

        id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        image_route: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }; 

    const config ={
        tableName : 'image_product', 
        timestamps: false,
        paranoid: true
    } ;

    const Image_product = sequelize.define(alias, col, config);

    Image_product.associate = (models)=>{

        Image_product.hasMany(models.Product , {
            as: 'product', 
            foreignKey: 'image_product_id'
        }); // 1 imagen corresponde a un producto. Esta en otra tabla al pedo creo jaja
    } // como la imagen por default puede usarse en varios productos tuve que cambiar la relacion de 1 a n. 


    return Image_product;

}