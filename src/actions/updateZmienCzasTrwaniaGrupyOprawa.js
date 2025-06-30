import axios from "axios";

import { IP } from "../utils/Host";


export function updateZmienCzasTrwaniaGrupyOprawa(drop_grupa_global_id,nowy_koniec,fechGrupyOprawaForProcesor) {

// id = procesor id

  axios.get(IP + "zmienCzasTrwaniaGrupyOprawa/"+drop_grupa_global_id+"/"+nowy_koniec)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    fechGrupyOprawaForProcesor(res.data[0].procesor_id)

    });
}
