const form = document.getElementById("FormProduct");
const inputs = document.querySelectorAll("#FormProduct input");

const regExp = {   //expresiones regulares
    re1: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, //letras y espacios
    re2: /^[0-9]+$/, //números
}

const fields = {
    nombre: false,
    costo: false,
    precio: false
}

const validateForm = (e) => {
    switch(e.target.name){
        case "nombre":
           validate(regExp.re1, e.target, "nombreError");
        break;
        case "costo":
            validate(regExp.re2, e.target, "costoError"); 
        break;
        case "precio":
            validate(regExp.re2, e.target, "precioError"); 
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
    if(fields.nombre && fields.costo && fields.precio){
        form.submit();
    }
});