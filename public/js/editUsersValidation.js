
window.onload = ()=>{


    const formEditUser = document.getElementById('formEditUser');

    // IS ERROR 
    const isError = (field, errorElement, text)=>{
        field.classList.add('isInvalid'); 
        field.classList.remove('isValid');
        if (!errorElement) {
            field.nextElementSibling.insertAdjacentHTML('beforeend',`<small class="msg-invalid"><br />${text}</small>`)
        }else{
            errorElement.remove(); 
            field.nextElementSibling.insertAdjacentHTML('beforeend',`<small class="msg-invalid"><br />${text}</small>`);
        }
        //btn_login.setAttribute('disabled', 'disabled'); 
    }

// IS OK 
    const isOk = (field, errorElement)=>{
        field.classList.add('isValid');
        field.classList.remove('isInvalid'); 
        if (errorElement) {
            errorElement.remove();
        }
        if (field.nextElementSibling.nextElementSibling.classList.contains('errors')) {
            field.nextElementSibling.nextElementSibling.style.display='none'
        }
    }


    /***********  VALIDACION ON-TIME DEL REGISTER ***********/
    formEditUser.addEventListener('input', e =>{

    e.preventDefault(); 
    const field = e.target; 
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    let errorElement = field.nextElementSibling.querySelector('.msg-invalid');
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    //console.log( field.nextElementSibling.nextElementSibling)

    //Verificar si el campo esta vacio!
    if (validator.isEmpty(fieldValue)) {
        isError(field, errorElement, `El campo ${fieldName} no puede estar vacío`);
    }else if (fieldValue && ((fieldName == 'name') || (fieldName == 'lastName')) && (!validator.isLength(fieldValue , { min: 3 })) ){
        isError(field, errorElement , `Este campo debe tener al menos 3 caracteres`)
    }else if( fieldValue && (fieldName == 'email') && (!validator.isEmail(fieldValue)) ){
        isError(field, errorElement , `Debe ser un formato de email válido`);
    }else if( fieldValue && (fieldName == 'password') && ( !validator.isLength(fieldValue, {min: 8}) )){
        isError(field , errorElement , `Este campo debe tener al menos 8 caracteres`);
    }else if (fieldValue && (fieldName == 'password') && (!validator.matches(fieldValue, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/))) {
        isError(field, errorElement, `Este campo debe tener al menos una letra mayuscula, 1 minuscula y 1 numero`);
    }else if (fieldValue && (fieldName == 'passConfirm') && ( !validator.equals(fieldValue, pass.value))) {
        isError(field, errorElement, `Las contraseñas no coinciden `)
    }else if ( fieldValue && (fieldName == 'userImage' && !validator.isIn(field.files[0].name.split('.').pop(). toLowerCase(), allowedExtensions)) ){
        isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`)
    }
    else {
        isOk(field , errorElement)
    }

    });


    /***********  VALIDACION ON-SUBMIT DEL EDIT USER ***********/
    formEditUser.addEventListener('submit', (e)=>{
        e.preventDefault();
        let isValid = true;

        formEditUser.querySelectorAll('.input').forEach( field => {

            const fieldValue = field.value;
            const fieldName = field.name;
            let errorElement = field.nextElementSibling.querySelector('.msg-invalid');
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            
            if (validator.isEmpty(fieldValue)) {
                isValid = false;
                isError(field, errorElement, `El campo ${fieldName} no puede estar vacío`);
            }else if (fieldValue && ((fieldName == 'name') || (fieldName == 'lastName')) && (!validator.isLength(fieldValue , { min: 3 })) ){
                isValid = false;
                isError(field, errorElement , `Este campo debe tener al menos 3 caracteres`)
            }else if( fieldValue && (fieldName == 'email') && (!validator.isEmail(fieldValue)) ){
                isValid = false;
                isError(field, errorElement , `Debe ser un formato de email válido`);
            }else if( fieldValue && (fieldName == 'password') && ( !validator.isLength(fieldValue, {min: 8}) )){
                isValid = false;
                isError(field , errorElement , `Este campo debe tener al menos 8 caracteres`);
            }else if (fieldValue && (fieldName == 'password') && (!validator.matches(fieldValue, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/))) {
                isValid = false;
                isError(field, errorElement, `Este campo debe tener al menos una letra mayuscula, 1 minuscula y 1 numero`);
            }else if (fieldValue && (fieldName == 'passConfirm') && ( !validator.equals(fieldValue, pass.value))) {
                isValid = false;
                isError(field, errorElement, `Las contraseñas no coinciden `)
            }else if ( fieldValue && (fieldName == 'userImage' && !validator.isIn(field.files[0].name.split('.').pop(). toLowerCase(), allowedExtensions)) ){
                isValid = false;
                isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`)
            }
            else {
                isValid = true
                isOk(field , errorElement)
            }
        })
        !isValid ? e.preventDefault() : formEditUser.submit();
    })

}