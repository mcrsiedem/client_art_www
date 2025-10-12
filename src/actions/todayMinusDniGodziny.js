// odejmuje ilosc dni od teraz jak wypada niedziela to odejmuje jeszcze 2 a jak sobota to 1

export function todayMinusDniGodziny(dni) {
  var d = new Date();

  d.setDate(d.getDate() - dni);

        if (d.getDay() == 6) {  //sobota
            d.setDate(d.getDate() - 1);
        }
        

        if (d.getDay() == 0) { //niedziela
            d.setDate(d.getDate() -2);
        }

  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();
        let  h =  d.getHours();
       let m = d.getMinutes();


  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

      if (h < 10) 
        h = '0' + h;
    if (m < 10) 
        m = '0' + m;

 
        h = '18' 
    
        m = '00'

  return [year, month, day].join('-').concat(" ").concat([h,m].join(':')); 
}
