import axios from "axios";

import { IP } from "../utils/Host";


export function updateDeletePrzerwa(global_id_grupa,fechGrupyAndWykonaniaForProcesor) {

// id = procesor id

  axios.get(IP + "updateDeletePrzerwa/"+global_id_grupa)
    .then((res) => {

    fechGrupyAndWykonaniaForProcesor(res.data[0].procesor_id)


    });
}
