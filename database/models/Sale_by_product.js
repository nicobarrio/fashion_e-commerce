module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Sale_by_product'; 

    const col = {

        id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        sale_by_user_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'sale_by_user',
                key: 'id'
            }
        },
        Product_idProduct:  {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'Product',
                key: 'idProduct'
            }
        }, 

        quantity: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        unit_price: {
            type: DataTypes.INTEGER, 
            allowNull: false
        } 
    };
    
    const config ={
        tableName : 'sale_by_product', 
        timestamps: false
    } ;

    const Sale_by_product = sequelize.define(alias, col, config);

    Sale_by_product.associate = (models)=>{

        Sale_by_product.belongsTo(models.Product,{
            as: 'product', 
            foreignKey: 'Product_idProduct'
        }); // 1 venta por producto va a tener solo 1 producto asignado

        Sale_by_product.belongsTo(models.Sale_by_user,{
            as: 'sale_by_user', 
            foreignKey: 'sale_by_user_id'
        }); // 1 venta por producto solo va a tener 1 factura de venta por usuario (y yo luego veo todas las que tiene un usuario)

    }


    return Sale_by_product;

}