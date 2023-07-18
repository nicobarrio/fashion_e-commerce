module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Ubication_user'; 

    const col = {

        idubication_user: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },

        city : DataTypes.STRING, 

        'state/province': {
            type: DataTypes.STRING,
            field: '`state/province`'
        },

        country: DataTypes.STRING, 
        postal_code: DataTypes.STRING

    }; 

    const config ={
        tableName : 'ubication_user', 
        timestamps: false
    } ;

    const Ubication_user = sequelize.define(alias, col, config);

    Ubication_user.associate = (models)=>{

        Ubication_user.hasMany(models.User , {
            as: 'user' , 
            foreignKey: 'ubication_user' 
        });                          // una ubicacion puede tener varios usuarios


    }


    return Ubication_user
}