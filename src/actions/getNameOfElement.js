
export function today(element_id,elementy, typy_elementow){

    // pokaz nazwę elementu po jego id

    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

        return [year, month, day].join('-'); 
}
