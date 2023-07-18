
window.onload = ()=>{
  const formCreateProd = document.getElementById("formCreateProd");
  const nombre = document.getElementById("nombre");
  const descripcion = document.getElementById("descripcion");
  const file_img = document.getElementById("file_img");
  const files_img = document.getElementById("files_img");
  const category = document.getElementById("category");
  const marca = document.getElementById("marca");
  const precio = document.getElementById("precio");
  const btn_crear_prod = document.getElementById("btn_crear_prod");
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  nombre.focus();

    //---------------- FUNCION PARA ERROR ------------------
    /* const isError = (field, errorElement, text) => {
        field.classList.remove("isValid");
        field.classList.add("isInvalid");
        if (!errorElement) {
            field.parentNode.insertAdjacentHTML(
                "beforeend",
                `<small class="msg-invalid"><br />${text}</small>`
            );
        }else{
            errorElement.remove();
            field.parentNode.insertAdjacentHTML(
                "beforeend",
                `<small class="msg-invalid"><br />${text}</small>`
            );
        }
    }; */
    const isError = (field, errorElement, text) => {
        if (field && field.parentNode) {
            field.classList.remove("isValid");
            field.classList.add("isInvalid");
            if (!errorElement) {
                field.parentNode.insertAdjacentHTML(
                    "beforeend",
                    `<small class="msg-invalid"><br />${text}</small>`
                );
            } else {
                errorElement.remove();
                field.parentNode.insertAdjacentHTML(
                    "beforeend",
                    `<small class="msg-invalid"><br />${text}</small>`
                );
            }
        }
    };
    
 /*    // ----------FUNCION PARA OK ------------------
    const isOk = (field, errorElement) => {
        field.classList.add("isValid");
        field.classList.remove("isInvalid");
        if (errorElement) {
        errorElement.remove();
        }
        if (field.parentNode.nextElementSibling.classList.contains('errors')) {
            console.log(field.parentNode.nextElementSibling)
            field.parentNode.nextElementSibling.style.display='none'
        }
        /* btn_crear_prod.removeAttribute('disabled') */
    /*}; */
    const isOk = (field, errorElement) => {
        if (field && field.parentNode && field.parentNode.nextElementSibling) {
            field.classList.add("isValid");
            field.classList.remove("isInvalid");
            if (errorElement) {
                errorElement.remove();
            }
            if (field.parentNode.nextElementSibling.classList.contains('errors')) {
                field.parentNode.nextElementSibling.style.display = 'none';
            }
        }
    };
    

  /*************  VALIDATION ON-TIME CREATE PRODUCT ***************/
  formCreateProd.addEventListener("input", (e) => {
    e.preventDefault();
    const field = e.target;
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    let errorElement = field.parentNode.querySelector(".msg-invalid");
    let imagenNo = 0 ;
    if (field.parentNode.nextElementSibling.classList.contains('errors')) {
        field.parentNode.nextElementSibling.style.display='none'
    }

    if ( validator.isEmpty(fieldValue) ) {
        isError(field, errorElement, `El campo ${fieldName} no puede estar vacío`);
    } else if( fieldValue && (fieldName == 'nombre') && ( !validator.isLength(fieldValue, {min: 5}) )) {
        isError(field, errorElement , `Este campo debe tener al menos 5 caracteres`);
    }else if( fieldValue && (fieldName == 'descripcion') && ( !validator.isLength(fieldValue, {min: 20}) )) {
        isError(field, errorElement , `Este campo debe tener al menos 20 caracteres`);
    }else if ( fieldValue && (fieldName == 'file_img' && !validator.isIn(field.files[0].name.split('.').pop(). toLowerCase(), allowedExtensions)) ){
        isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`)
    }else if ( fieldValue && (fieldName == 'precio') && (!validator.isNumeric(fieldValue)) ) {
        isError(field, errorElement , `El valor ingresado debe ser númerico`)
    }else if ( fieldValue && (fieldName == 'files_img' ) && Array.from(field.files).length > 4) { 
        isError(field, errorElement, 'No puedes subir más de 4 archivos');
    }else if (fieldValue && (fieldName == 'files_img' ) && (Array.from(field.files).length <= 4 && Array.from(field.files).length > 0 )) {
        const files = Array.from(field.files);
        files.forEach( file => {
            const extension = file.name.split('.').pop().toLowerCase();
            if (!validator.isIn(extension, allowedExtensions)) {
                imagenNo++
                //fieldValue = ''; 
            }
        })
        imagenNo > 0 ? isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`) : isOk(field , errorElement)     
    }else {
        isOk(field , errorElement)
    }

    //para los radio button
    const tipoErrorContainer = document.getElementById('tipoErrorContainer');
    const tallesErrorContainer = document.getElementById('tallesErrorContainer');
    const radioButtonsTipo = formCreateProd.querySelectorAll('input[type="radio"][name="tipo"]');
    const radioButtonsTalle = formCreateProd.querySelectorAll('input[type="radio"][name="talle"]');

      // Validación para el campo de radio "tipo"
      let tipoChecked = false;
      radioButtonsTipo.forEach((radioButton) => {
          if (radioButton.checked) {
              tipoChecked = true;
              tipoErrorContainer.innerHTML = '';
              tipoErrorContainer.style.display='none';
              
          }
      });

      let talleChecked = false;
        radioButtonsTalle.forEach((radioButton) => {
            if (radioButton.checked) {
                talleChecked = true;
                tallesErrorContainer.innerHTML = '';
                tallesErrorContainer.style.display='none';
            }
        });



});

/***************  VALIDATION ON-SUBMIT CREATE PRODUCT  *******************/
     formCreateProd.addEventListener('submit', e => {

        e.preventDefault(); 
        let isValid = true;
        const formElements = formCreateProd.querySelectorAll('input:not([type="radio"]), select, textarea');
        const tipoErrorContainer = document.getElementById('tipoErrorContainer');
        const tallesErrorContainer = document.getElementById('tallesErrorContainer');



        formElements.forEach((field) => {
          const fieldValue = field.value;
          const fieldName = field.name;
          let errorElement = field.parentNode.querySelector(".msg-invalid");
          let imagenNo = 0;

          if ( validator.isEmpty(fieldValue) ) {
                isValid = false;
                isError(field, errorElement, `El campo ${fieldName} no puede estar vacío`);
            } else if( fieldValue && (fieldName == 'nombre') && ( !validator.isLength(fieldValue, {min: 5}) )) {
                isValid = false;
                isError(field, errorElement , `Este campo debe tener al menos 5 caracteres`);
            }else if( fieldValue && (fieldName == 'descripcion') && ( !validator.isLength(fieldValue, {min: 20}) )) {
                isValid = false;
                isError(field, errorElement , `Este campo debe tener al menos 20 caracteres`);
            }else if ( fieldValue && (fieldName == 'file_img' && !validator.isIn(field.files[0].name.split('.').pop(). toLowerCase(), allowedExtensions)) ){
                isValid = false;
                isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`)
            }else if ( fieldValue && (fieldName == 'precio') && (!validator.isNumeric(fieldValue)) ) {
                isValid = false;
                isError(field, errorElement , `El valor ingresado debe ser númerico`)
            }else if ( fieldValue && (fieldName == 'files_img' ) && Array.from(field.files).length > 4) { 
                isValid = false;
                isError(field, errorElement, 'No puedes subir más de 4 archivos');
            }else if (fieldValue && (fieldName == 'files_img' ) && (Array.from(field.files).length <= 4 && Array.from(field.files).length > 0 )) {
                const files = Array.from(field.files);
                files.forEach( file => {
                    const extension = file.name.split('.').pop().toLowerCase();
                    if (!validator.isIn(extension, allowedExtensions)) {
                        imagenNo++
                    }
                })
                if (imagenNo > 0 ) {
                    isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`);
                    isValid = false;
                } else {
                    isOk(field, errorElement);
                }

/* 
                imagenNo > 0 ? isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`) : isOk(field , errorElement)  */    
            }else {
                /* isValid = true; */
                isOk(field , errorElement)
        }
        });

        const radioButtonsTipo = formCreateProd.querySelectorAll('input[type="radio"][name="tipo"]');
        const radioButtonsTalle = formCreateProd.querySelectorAll('input[type="radio"][name="talle"]');

        // Validación para el campo de radio "tipo"
        let tipoChecked = false;
        radioButtonsTipo.forEach((radioButton) => {
            if (radioButton.checked) {
                tipoChecked = true;
                tipoErrorContainer.innerHTML = '';
                tipoErrorContainer.style.display='none';
                
            }
        });
        if (!tipoChecked) {
            isValid = false;
            const tipoErrorElement = formCreateProd.querySelector('.errors');
            isError(null, tipoErrorElement, 'Debes seleccionar un tipo de prenda');

        } else {
            const tipoErrorElement = formCreateProd.querySelector('.errors');
            isOk(null, tipoErrorElement);
        }

        // Validación para el campo de radio "talle"
         let talleChecked = false;
        radioButtonsTalle.forEach((radioButton) => {
            if (radioButton.checked) {
                talleChecked = true;
                tallesErrorContainer.innerHTML = '';
                tallesErrorContainer.style.display='none';
            }
        });
        if (!talleChecked) {
            isValid = false;
            const talleErrorElement = formCreateProd.querySelector('.errors');
            isError(null, talleErrorElement, 'Debes seleccionar un tipo de talle');
        } else {
            const talleErrorElement = formCreateProd.querySelector('.errors');
            isOk(null, talleErrorElement);
        }
 

        // unir los dos aca
        if (!isValid) {
            const errorElement = document.createElement('small');
            const errorElement2 = document.createElement('small');
            errorElement.classList.add('errors');
            errorElement2.classList.add('errors');
            errorElement.textContent = 'Por favor, selecciona una opcion';
            errorElement2.textContent = 'Por favor, selecciona una opcion';

            tipoErrorContainer.innerHTML = '';
           // tallesErrorContainer.innerHTML = '';
            tipoErrorContainer.appendChild(errorElement);
            tallesErrorContainer.appendChild(errorElement2);
        } else {
            tipoErrorContainer.innerHTML = '';
            tallesErrorContainer.innerHTML = '';
            //errorElement.innerHTML = '';
        }


      

        if (isValid) {
            formCreateProd.submit()
        }
        
    })
}