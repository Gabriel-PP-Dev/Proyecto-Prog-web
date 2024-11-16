const form = document.getElementById("FormClient");
const inputs = document.querySelectorAll("#FormClient input");

const regExp = {   //expresiones regulares
    re1: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, //letras y espacios
    re2: /^[0-9]+$/, //números
    re3: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.,]+$/      //direccion
}

const fields = {
    nombre: false,
    carnet: false,
    telefono: false,
    direccion: false
}

const validateForm = (e) => {
    switch(e.target.name){
        case "nombre":
           validate(regExp.re1, e.target, "nombreError");
        break;
        case "carnet":
            validate(regExp.re2, e.target, "carnetError");
        break;
        case "telefono":
            validate(regExp.re2, e.target, "telefonoError");   
        break;
        case "direccion":
            validate(regExp.re3, e.target, "direccionError"); 
        break;
    }
 }

const validate = (expresion, input, error) => {
        const selectedInput = form.querySelector(`#${input.name}`);
        const selectedMessage = form.querySelector(`#${error}`);
        if(expresion.test(input.value)){
            selectedInput.style.border = "none"; 
            selectedMessage.style.display = "none";
            fields[input.name]=true;
        }else{
            selectedInput.style.border = "3px solid rgb(139, 102, 134)"; 
            selectedMessage.style.display = "block";
            fields[input.name]=false;
    }     
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validateForm);
    input.addEventListener("blur", validateForm);
});

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    if(fields.nombre && fields.direccion && fields.telefono && fields.carnet){
        form.reset();
    }
});