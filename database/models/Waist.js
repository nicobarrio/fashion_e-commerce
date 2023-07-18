module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Waist'; 

    const col = {

        id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        waist: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }; 

    const config ={
        tableName : 'waist', 
        timestamps: false
    } ;

    const Waist = sequelize.define(alias, col, config);

    Waist.associate = (models)=>{
        Waist.hasMany(models.Product, {
            as: 'product', 
            foreignKey: 'waist_id'
        }); 
    }


    return Waist;

}