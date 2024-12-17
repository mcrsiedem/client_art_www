import axios from "axios";

import { IP } from "../utils/Host";


export function updateWydzielWykonanieZgrupy(global_id_wykonania,fechparametryTechnologii) {

// id = procesor id

  axios.get(IP + "updateWydzielWykonanieZgrupy/"+global_id_wykonania)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    fechparametryTechnologii(res.data[0].technologia_id)

    });
}
