
window.addEventListener('load', ()=>{

// Me traigo los elementos del Login
    const formLogin = document.getElementById('formLogin'); 
    const emailLogin = document.getElementById('emailLogin');
    const passwordLogin = document.getElementById('passwordLogin'); 
    const recordarme = document.getElementById('recordarme'); 
    const btn_login = document.getElementById('btn_login'); 

emailLogin.focus(); // Autofocus

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


/***********  VALIDACION ON-TIME DEL LOGIN ***********/
formLogin.addEventListener('input', e =>{

    e.preventDefault(); 
    const field = e.target; 
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    let errorElement = field.nextElementSibling.querySelector('.msg-invalid') 
    //console.log( field.nextElementSibling.nextElementSibling)

    //Verificar si el campo esta vacio!
    if (validator.isEmpty(fieldValue)) {
        isError(field, errorElement, `El campo ${fieldName} no puede estar vacío`);
    } else if( fieldValue && (fieldName == 'emailLogin') && (!validator.isEmail(fieldValue)) ){
        isError(field, errorElement , `Debe ser un formato de email válido`);
    }else if( fieldValue && (fieldName == 'passwordLogin') && ( !validator.isLength(fieldValue, {min: 8}) )){
        isError(field , errorElement , `Este campo debe tener al menos 8 caracteres`);
    }else {
        isOk(field , errorElement)
    }
})

/***********  VALIDACION ON-SUBMIT DEL LOGIN ***********/
formLogin.addEventListener('submit', e => {

    e.preventDefault(); 
    let isValid = true;

    formLogin.querySelectorAll('.input').forEach( field => {

        const fieldValue = field.value;
        const fieldName = field.name;
        let errorElement = field.nextElementSibling.querySelector('.msg-invalid') 

        if (!fieldValue) {
            isValid = false;
            return isError(field , errorElement, `El campo ${field.name} no puede estar vacío`)
        }else if( fieldValue && (fieldName == 'emailLogin') && (!validator.isEmail(fieldValue))){
            isValid = false;
            isError(field, errorElement , `Debe ser un formato de email válido`);
        }else if(fieldValue && (fieldName == 'passwordLogin') && ( !validator.isLength(fieldValue, {min: 8}) )){
            isValid = false;
            isError(field , errorElement , `Este campo debe tener al menos 8 caracteres`);
        }else{
            isValid = true;
            isOk(field, errorElement)
        }
    })

    !isValid ? e.preventDefault() : formLogin.submit();
})


const formRegister = document.getElementById('formRegister'); 
const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const passConfirm = document.getElementById('passConfirm');
const avatar = document.getElementById('avatar');
const btn_register = document.getElementById('btn_register');

/***********  VALIDACION ON-TIME DEL REGISTER ***********/
formRegister.addEventListener('input', e =>{

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




    //|| field.files.length === 0
});

/************ VALIDACION ON-SUBMIT DEL REGISTER ***************/
formRegister.addEventListener('submit', e => {

    e.preventDefault(); 
    let isValid = true;

    formRegister.querySelectorAll('.input').forEach( field => {

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

    !isValid ? e.preventDefault() : formRegister.submit();
})





})