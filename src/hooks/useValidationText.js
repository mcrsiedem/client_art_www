import { useState } from "react";
export const useValidationText = (txt) =>{
    const [textValidated,setTextValidated] = useState(txt);




    const checkValidation = (txt) =>{
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
    if ( txt  === '' || re.test(txt)) {
        setTextValidated(txt)
    }

    }

    
    return[textValidated,checkValidation]

}
// do p[oprawy]