module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Category_product'; 

    const col = {

        idcategory_product: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }; 

    const config ={
        tableName : 'category_product', 
        timestamps: false
    } ;

    const Category_product = sequelize.define(alias, col, config);

    Category_product.associate = (models)=> {

        Category_product.hasMany( models.Product , {
            as: 'product', 
            foreignKey: 'category_id'
        });  // una categoria (hombre, mujer, niño, accesorio puede tener varios productos.)

    }


    return Category_product;

}