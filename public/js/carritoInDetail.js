
window.onload = ()=>{

    // Obtener el botón "Agregar al carrito"
    const addToCartButton = document.querySelector('.agregar-carrito');

  // Manejar el evento de envío del formulario
  addToCartButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        const productId = addToCartButton.dataset.productId;
        const product = {
            id: productId,
            quantity: 1,
            size: 'XS' // Aquí puedes obtener el valor del tamaño seleccionado por el usuario
        };

        // Obtener el carrito de compras actual del LocalStorage (si existe)
        let cart = localStorage.getItem('cart');
        if (cart) {
        cart = JSON.parse(cart);
        } else {
        cart = [];
        }

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            existingProduct.quantity += 1;
        } else {
            // Si el producto no está en el carrito, agregarlo
            cart.push(product);
        }

        // Guardar el carrito actualizado en el LocalStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Mostrar una notificación o mensaje de éxito
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Agregado al carrito exitosamente!',
            showConfirmButton: false,
            timer: 1500
          })
  });



  /***************  Logica para eliminar el producto  *********************/
  const form_editar_eliminar = document.getElementById('form_editar_eliminar'); 

  form_editar_eliminar.addEventListener('submit', e => {

    e.preventDefault(); 
    Swal.fire({
        title: 'Estas seguro?',
        text: "Estas por eliminar este producto de la base de datos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar!'
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
            'Borrado!',
            'Has borrado este producto',
            'success'
        )
        form_editar_eliminar.submit();
        }else{
            e.preventDefault();
        }
    })

  })

}

  