import axios from "axios";

import { IP } from "../utils/Host";


export function updateWykonaniaOrazGrupa(global_id_grupa_wykonan,kolumna,wartosc,fechparametryTechnologii,zamowienie_id) {

// id = procesor id

  axios.get(IP + "updateWykonaniaOrazGrupa/"+global_id_grupa_wykonan+"/"+kolumna+"/"+wartosc)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    fechparametryTechnologii(zamowienie_id,res.data[0].technologia_id)

    });
}
