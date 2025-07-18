import axios from "axios";

import { IP } from "../utils/Host";


export function druk_alert  (grup) {
  // let data_spedycji_init = new Date(grup.data_spedycji+ " 06:00")

  let data_alert = new Date(grup.data_spedycji+ " 06:00")
    let poczatek = new Date(grup.poczatek)
    // let czas = parseInt(grup.czas) + (72*60) -360
    let czas = parseInt(grup.czas) + (72*60) 

   data_alert.setMinutes(data_alert.getMinutes() - czas)

      let  month = '' + (data_alert.getMonth() + 1),
        day = '' + data_alert.getDate(),
        year = data_alert.getFullYear();
        let  h =  data_alert.getHours();
       let m = data_alert.getMinutes();
               if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    if (h < 10) 
        h = '0' + h;
    if (m < 10) 
        m = '0' + m;

    if(poczatek> data_alert){
      return true
    }
          //  return [year, month, day].join('-').concat(" ").concat([h,m].join(':')); 
          //  return czas
  }