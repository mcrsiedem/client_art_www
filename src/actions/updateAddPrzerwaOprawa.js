import axios from "axios";

import { IP } from "../utils/Host";


export function updateAddPrzerwaOprawa(global_id_grupa,czas,fechGrupyOprawaForProcesor) {

// id = procesor id

  axios.get(IP + "updateAddPrzerwaOprawa/"+global_id_grupa+"/"+czas)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    fechGrupyOprawaForProcesor(res.data[0].procesor_id)


    });
}
