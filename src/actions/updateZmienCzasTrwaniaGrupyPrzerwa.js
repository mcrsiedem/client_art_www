import axios from "axios";

import { IP } from "../utils/Host";


export function updateZmienCzasTrwaniaGrupyPrzerwa(drop_grupa_global_id,nowy_koniec,fechGrupyAndWykonaniaForProcesor) {

// id = procesor id

  axios.get(IP + "zmienCzasTrwaniaGrupyPrzerwa/"+drop_grupa_global_id+"/"+nowy_koniec)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    fechGrupyAndWykonaniaForProcesor(res.data[0].procesor_id)

    });
}
