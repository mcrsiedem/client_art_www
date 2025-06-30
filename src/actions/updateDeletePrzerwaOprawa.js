import axios from "axios";

import { IP } from "../utils/Host";


export function updateDeletePrzerwaOprawa(global_id_grupa,fechGrupyOprawaForProcesor) {

// id = procesor id

  axios.get(IP + "updateDeletePrzerwaOprawa/"+global_id_grupa)
    .then((res) => {

    fechGrupyOprawaForProcesor(res.data[0].procesor_id)


    });
}
