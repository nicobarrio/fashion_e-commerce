module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Sale_by_user'; 

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
        
        numero_factura : {
            type: DataTypes.STRING, 
            allowNull: false
        }, 

        detalle: DataTypes.STRING
    };
    
    const config ={
        tableName : 'sale_by_user', 
        timestamps: false
    } ;

    const Sale_by_user = sequelize.define(alias, col, config);

    Sale_by_user.associate = (models)=>{

        Sale_by_user.belongsTo(models.User , {
            as: 'user', 
            foreignKey: 'user_id'
        }); 
        // un detalle de venta estará asociado a 1 usuario

        Sale_by_user.hasMany(models.Sale_by_product, {
            as: 'sale_by_product', 
            foreignKey: 'sale_by_user_id'
        }); // un detalle venta por usuario puede estar en muchos registro venta por productos (xq un usuario puede comprar varios productos distintos)

    }

    return Sale_by_user;

}