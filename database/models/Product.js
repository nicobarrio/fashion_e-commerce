

module.exports = (sequelize, DataTypes) => {


    const alias = 'Product'

    const col = {

        idProduct: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        discount: DataTypes.INTEGER,
        stars: DataTypes.INTEGER,

        description: {
            type: DataTypes.STRING(255),
            defaultValue: 'Sin descripcion'
        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        image_product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'image_product',
                key: 'id'
            }
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'brand_product',
                key: 'brand_id'
            }
        },
        waist_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'waist',
                key: 'id'
            }
        },
        clothes_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clothes_type',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category_product',
                key: 'idcategory_product'
            }
        }
    }

    const config = {
        tableName: 'product',
        timestamps: false,
        paranoid: true
    };



    const Product = sequelize.define(alias, col, config);

    Product.associate = (models) => {

        Product.belongsTo(models.Category_product, {
            as: 'category_product',
            foreignKey: 'category_id'
        });

        Product.belongsTo(models.Clothes_type, {
            as: 'clothes_type',
            foreignKey: 'clothes_type_id'
        });

        Product.belongsTo(models.Image_product, {
            as: 'imageProduct',
            foreignKey: 'image_product_id'
        });

        Product.hasMany(models.Other_images, {
            as: 'other_images',
            foreignKey: 'id_product',
            onDelete: 'CASCADE'
        });    // 1 producto puede tener varias imagenes.

        Product.belongsTo(models.Brand_product, {
            as: 'brand_product',
            foreignKey: 'brand_id'
        });

        Product.belongsTo(models.Waist, {
            as: 'waist',
            foreignKey: 'waist_id'
        });

        Product.belongsToMany(models.User, {
            as: 'users',
            through: 'favorite_product',
            foreignKey: 'product_id',
            otherKey: 'user_id',
            timestamps: false
        });// relacion muchos a muchos de user y product a traves de favorite_product. 

        Product.hasMany(models.Sale_by_product, {
            as: 'sales_by_product',
            foreignKey: 'Product_idProduct'
        }); // un producto puede estar en varias ventas por producto 

    }



    return Product;
};