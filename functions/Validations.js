function isNumber(cadena){ //validación de números
    for(let i=0; i<cadena.length;i++){
        let character = cadena.charAt(i);
        if(!isNaN(parseInt(character))&&(parseInt(character)>=0)){
            continue;
        }else{
           return false;
        }
    }
    return true;
}

function isLetter(cadena){  //validación de letras y espacios
    for(let i=0; i<cadena.length;i++){
        let character = cadena.charAt(i);
        if(character.match(/[a-zA-Z ]/)){
            continue;
        }else{
           return false;
        }
    }
    return true;
}

function validationNumbersWithAlert(cadena){  
   if(!(this.isNumber(cadena.split(":")[1]))){
      alert("La sección"+cadena.split(":")[0]+"no tiene caracteres válidos");
      return false;
   }
   return true;
}

function validationLettersWithAlert(cadena){  
    if(!(this.isLetter(cadena.split(":")[1]))){
       alert("La sección"+cadena.split(":")[0]+"no tiene caracteres válidos");
       return false;
    }
    return true;
 }