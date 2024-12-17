import axios from "axios";

import { IP } from "../utils/Host";


export function updateWykonaniaOrazGrupa(global_id_grupa_wykonan,kolumna,wartosc,fechparametryTechnologii) {

// id = procesor id

  axios.get(IP + "updateWykonaniaOrazGrupa/"+global_id_grupa_wykonan+"/"+kolumna+"/"+wartosc)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    fechparametryTechnologii(res.data[0].technologia_id)

    });
}
