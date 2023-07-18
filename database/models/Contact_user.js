module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Contact_user'; 

    const col = {

        idcontact_user: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING(100), 
            allowNull: false
        },
        floor: DataTypes.SMALLINT,
        number: DataTypes.SMALLINT,
        apartment: DataTypes.STRING
    }; 

    const config ={
        tableName : 'contact_user', 
        timestamps: false
    } ;

    const Contact_user = sequelize.define(alias, col, config);

    Contact_user.associate = (models)=>{

        Contact_user.hasMany(models.User , {
            as: 'user', 
            foreignKey: 'contact_user'
        }); // vamos a hacer que un contacto de direccion puede estar en varios usuarios que vivan juntos por ej. 

    }


    return Contact_user;

}