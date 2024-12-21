
export function date_time(datdetime){

    let d = new Date(datdetime)

       let month = '' + (d.getMonth() + 1)
       let day = '' + d.getDate()
       let year = d.getFullYear()
       let h = d.getHours()
       let m = d.getMinutes()

        if (month.length < 2)         month = '0' + month;
        if (day.length < 2)         day = '0' + day;
        if (h < 10)             h = '0' + h;
        if (m < 10)             m = '0' + m;

        return [year, month,day].join('-').concat(" ").concat(h).concat(":").concat(m); 
}
