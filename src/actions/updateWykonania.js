import axios from "axios";

import { IP } from "../utils/Host";


export function updateWykonania(global_id_wykonania,kolumna,wartosc,fechparametryTechnologii) {

// id = procesor id

  axios.get(IP + "updateWykonania/"+global_id_wykonania+"/"+kolumna+"/"+wartosc)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    fechparametryTechnologii(res.data[0].technologia_id)

    });
}
