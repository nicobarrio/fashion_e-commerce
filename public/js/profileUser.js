window.onload = ()=>{

    console.log(('estoy aqui'))
    const btn_eliminarCuenta = document.getElementById('btn_eliminarCuenta');
    const form_eliminarCuenta = document.getElementById('form_eliminarCuenta');


    form_eliminarCuenta.addEventListener('submit', e => {

        e.preventDefault();
        Swal.fire({
            title: 'Eliminar tu cuenta?',
            text: "Luego no podras recuperarla",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire(
                'Eliminada!',
                'Has borrado tu cuenta',
                'success'
            )
            form_eliminarCuenta.submit();
            }else{
                e.preventDefault();
            }
        })


    })


}