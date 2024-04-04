
const goInputValidation = (event,type) => {

switch(type){

    case 'number' :  //sztuki, nakład itp
        const reg_number = /^[0-9]+$/;
        if (event.target.value === '' || reg_number.test(event.target.value)) {
            return true;
        }
    break;

    case 'price' :  //cena 10,30
    const reg_price = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;
    if (event.target.value === '' || reg_price.test(event.target.value)) {
        return true;
    }
break;








    deafault:
    return false;
    
}

}

export {goInputValidation}