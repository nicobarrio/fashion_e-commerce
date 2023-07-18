module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Brand_product'; 

    const col = {

        brand_id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        brand_name: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }; 

    const config ={
        tableName : 'brand_product', 
        timestamps: false
    } ;

    const Brand_product = sequelize.define(alias, col, config);

    Brand_product.associate = (models)=>{
        Brand_product.hasMany(models.Product , {
            as: 'product', 
            foreignKey: 'brand_id'
        }); // 1 marca puede tener muchos productos
    }

    return Brand_product;

}