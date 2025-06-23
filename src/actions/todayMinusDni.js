// dodaje 5 dni do dzisiejszej daty, jeśli wypada sobota dodaje jeszcze 2 dni, w niedziele dodaje 1
// używane do auto data spedycji

export function todayMinusDni(dni) {
  var d = new Date();

  d.setDate(d.getDate() - dni);

        if (d.getDay() == 6) {  //sobota
            d.setDate(d.getDate() + 2);
        }
        

        if (d.getDay() == 0) { //niedziela
            d.setDate(d.getDate() + 1);
        }

  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
