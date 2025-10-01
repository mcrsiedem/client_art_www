import axios from "axios";

import { IP } from "../utils/Host";


export function updateAddPrzerwaMagic(global_id_grupa,czas,fechGrupyAndWykonaniaForProcesor,selectedProcesor) {

// id = procesor id

  axios.get(IP + "updateAddPrzerwaMagic/"+global_id_grupa+"/"+czas)
    .then((res) => {
    // console.log("procesor ",res.data)
    // fechparametryTechnologii
    fechGrupyAndWykonaniaForProcesor(selectedProcesor)


    });
}
