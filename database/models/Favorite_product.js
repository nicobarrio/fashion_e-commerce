module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Favorite_product'; 

    const col = {

        id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'user',
                key: 'iduser'
            }
        },
        product_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'Product',
                key: 'idProduct'
            }
        }
    };
    
    const config ={
        tableName : 'favorite_product', 
        timestamps: false
    } ;

    const Favorite_product = sequelize.define(alias, col, config);

    return Favorite_product;

}