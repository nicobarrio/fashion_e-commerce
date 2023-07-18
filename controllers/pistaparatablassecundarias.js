/* Estoy trabajando con sequelize y javascript para un ecommerce de productos de ropa. 
Tengo el siguiente codigo para mi controlador que relaciona los modelos "User", "Product" y los modelos de las tablas secundarias: "Sale_by_product" y "Sale_by_user". 
El modelo "Sale_by_product" tiene una columna "sale_by_user_id" que es una clave foranea que relaciona con el modelo "Sale_by_user". 
Lo que yo quiero hacer con el controlador es que cuando se realice una compra, a traves del metodo post que me llega por una ruta se generen y creen estas dos tablas secundarias. 
El tema es que "Sale_by_user" representa a una compra de un usuario, y la misma puede tener varios modelos de "Sale_by_product" asociados, ya que este ultimo modelo solo describe 1 producto comprado. Pero en el caso de que un usuario compre más de un producto, entonces deberia tener 2 nuevos registros en "Sale_by_product" asociados a solo 1 registro de "Sale_by_user". 
Mi codigo hasta el momento estaba asi:  */


    crearFactura: async(req, res)=>{


        //buscar el usuario que hace la compra
        // validar primero si esta loggeado acà y usar un middleware de autentificacion
        const userSale = await db.User.findByPk(req.session.userLogged.idUser);

        //buscar cual va a ser el producto que vamos a comprar y guardar en la factura
        const elegido = await db.Product.findByPk(req.params.id);

        const newDetalleUser = await db.Sale_by_user.create({
            user_id: userSale.iduser ,
            detalle: 'mandar un mensaje por defecto',
            numero_factura: 'generar automaticamente'
        })

        const newFactura = await db.Sale_by_product.create({
            unit_price:  req.body.unit_price, 
            cuantity: req.body.cuantity ,
            Product_idProduct: elegido.idProduct,
            sale_by_user_id: newDetalleUser.id
        })
    }
   
/* Es decir, creaba solo 1 modelo de cada uno por vez. 
Como puedo modificarlo para cumplir lo anteriormente dicho ? */

/* Para lograr lo que quieres, necesitas hacer algunas modificaciones en tu código. Lo que necesitas hacer es crear varios registros en el modelo "Sale_by_product" para cada producto que el usuario haya comprado y asociarlos a un solo registro en el modelo "Sale_by_user".
 */
/* Primero, necesitas recibir los productos que el usuario compró en el cuerpo de la solicitud POST. Puedes hacerlo creando un array de objetos en el cuerpo de la solicitud, donde cada objeto representa un producto y contiene el precio unitario y la cantidad comprada. Por ejemplo:
 */


{
  "products": [
    {
      "unit_price": 10.0,
      "quantity": 2
    },
    {
      "unit_price": 20.0,
      "quantity": 1
    }
  ]
}
/* Luego, en tu controlador, necesitas crear el registro en el modelo "Sale_by_user" primero y luego crear los registros en el modelo "Sale_by_product" para cada producto comprado. Puedes hacer esto con un bucle for que recorra el array de productos y cree un registro en "Sale_by_product" para cada uno, asociándolo al registro en "Sale_by_user". Aquí te muestro cómo puedes modificar tu código:
 */


crearFactura: async(req, res) => {
  try {
    // Buscar el usuario que hace la compra
    const userSale = await db.User.findByPk(req.session.userLogged.idUser);

    // Crear el registro en Sale_by_user
    const newDetalleUser = await db.Sale_by_user.create({
      user_id: userSale.iduser,
      detalle: 'mandar un mensaje por defecto',
      numero_factura: 'generar automaticamente'
    });

    // Crear los registros en Sale_by_product para cada producto comprado
    for (const product of req.body.products) {
      const elegido = await db.Product.findByPk(req.params.id); // aca ver de donde saco los id de los productos, xq si son mas de uno no me van a llegar por req.params

      await db.Sale_by_product.create({
        unit_price: product.unit_price,
        quantity: product.quantity,
        Product_idProduct: elegido.idProduct,
        sale_by_user_id: newDetalleUser.id
      });
    }

    res.status(201).json({ message: 'Factura creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear factura' });
  }
}

/* Actualizar el stock de cada producto en la base de datos. Para hacer esto, debes obtener el stock actual del producto, restarle la cantidad vendida y luego actualizar el registro del producto en la base de datos. Puedes hacer esto utilizando el método findOne de Sequelize para obtener el registro del producto, actualizar su propiedad stock y luego utilizar el método save para guardar los cambios. */