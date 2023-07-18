module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Clothes_type'; 

    const col = {

        id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }; 

    const config ={
        tableName : 'clothes_type', 
        timestamps: false
    } ;

    const Clothes_type = sequelize.define(alias, col, config);

    Clothes_type.associate = (models)=>{

        Clothes_type.hasMany(models.Product , {
            as: 'product', 
            foreignKey: 'clothes_type_id'
        }); 

    }


    return Clothes_type;

}