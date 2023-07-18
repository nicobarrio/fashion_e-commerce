module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Other_images'; 

    const col = {

        id_images: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: DataTypes.STRING, 
            allowNull: false,
            defaultValue: 'image.png'
        }, 
        id_product: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references: {
                model: 'product',
                key: 'idProduct'
            }
        }
    }; 

    const config ={
        tableName : 'other_images', 
        timestamps: false,
        paranoid: true
    } ;

    const Other_images = sequelize.define(alias, col, config);

    Other_images.associate = (models)=> {
        Other_images.belongsTo(models.Product, {
            as: 'product', 
            foreignKey: 'id_product', 
            onDelete: 'CASCADE'
        });                 // 1 imagen va a corresponder a 1 producto. 
    }

    return Other_images;

}