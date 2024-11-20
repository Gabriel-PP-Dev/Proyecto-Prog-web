const form = document.getElementById("FormSale");
const inputs = document.querySelectorAll("#FormSale input");

const regExp = {   //expresiones regulares
    re1: /^[0-9]+$/, //números
}

const fields = {
    carnet: false,
    cantidad: false
}

const validateForm = (e) => {
    switch(e.target.name){
        case "carnet":
           validate(regExp.re1, e.target, "carnetError");
        break;
        case "cantidad":
            validate(regExp.re1, e.target, "cantidadError"); 
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
    if(fields.cantidad && fields.carnet){
        form.submit();
    }
});