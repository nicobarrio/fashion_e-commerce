window.onload = ()=>{

    const btn_remove = document.querySelectorAll('.btn-remove');

    btn_remove.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const formId = btn.getAttribute('data-form');
            const form_delete = document.querySelector(`.${formId}`);
            Swal.fire({
                        title: 'Estas seguro?',
                        text: "Estas por eliminar este producto de tus favoritos!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Borrar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                        Swal.fire(
                            'Borrado!',
                            'Has borrado este producto de tus favoritos',
                            'success'
                        )
                        form_delete.submit();
                        }else{
                            e.preventDefault();
                        }
                    })


        })
    })

}