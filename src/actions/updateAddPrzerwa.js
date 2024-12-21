import axios from "axios";

import { IP } from "../utils/Host";


export function updateAddPrzerwa(global_id_grupa,czas,fechGrupyAndWykonaniaForProcesor) {

// id = procesor id

  axios.get(IP + "updateAddPrzerwa/"+global_id_grupa+"/"+czas)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    fechGrupyAndWykonaniaForProcesor(res.data[0].procesor_id)


    });
}
