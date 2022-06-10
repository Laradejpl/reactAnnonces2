export const validateInputField = (label, type, value)=>{
    // si le champs est vide on retourne une erreur
    if(value === ""){
        return "Le champs "+label+" est vide !"; 
    }    
    //conditions switch sur type
    switch(type){
        //email
        case "email":
            // on test le mail à l'aide d'un regex qui teste les mails
            const regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            
            // si le test du regex est faux, alors on retourne une string d'erreur
            if(regMail.test(value) === false){
                return "Votre"+ label +"n'est pas valide !!!"
            }
        break;
        //password
        case "password":
            /* on test le mot de passe à l'aide d'un regex qui teste les strings pour avoir 8 chiffres,lettre, majuscule, minuscule, caractère spécial*/
            const regPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
            
            // si le test du regex est faux, alors on retourne une string d'erreur
             if(regPass.test(value) === false){
                return "Votre"+ label +"n'est pas valide !!! il doit avoir 8 charactéres chiffres,lettre, majuscule, minuscule, caractère spécial"
            }
            
            
        break;  
     
      
            
    }     
    // si tout va bien on retourne true, le champ de formulaire est validé
    return true;
    
}