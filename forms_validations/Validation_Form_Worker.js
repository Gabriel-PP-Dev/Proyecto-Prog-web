const form = document.getElementById("FormWorker");
const inputs = document.querySelectorAll("#FormWorker input");

const regExp = {   //expresiones regulares
    re1: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, //letras y espacios
    re2: /^[0-9]+$/, //números
    re3: /^\d*(\.\d+)?$/, //números y punto
}

const fields = {
    nombre: false,
    carnet: false,
    telefono: false,
    rol:false,
    salario:false,
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
        case "rol":
            validate(regExp.re1, e.target, "rolError"); 
        break;
        case "salario":
            validate(regExp.re3, e.target, "salarioError"); 
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
    if(fields.nombre && fields.carnet && fields.telefono && fields.rol && fields.salario){
        form.submit();
    }
});