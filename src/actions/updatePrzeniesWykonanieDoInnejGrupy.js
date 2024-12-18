import axios from "axios";

import { IP } from "../utils/Host";


export function updatePrzeniesWykonanieDoInnejGrupy(global_id_wykonania,grupa_id_drop,fechparametryTechnologii, ostatnie_wykonania) {

// id = procesor id

  axios.get(IP + "updatePrzeniesWykonanieDoInnejGrupy/"+global_id_wykonania+"/"+grupa_id_drop+"/"+ostatnie_wykonania)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    fechparametryTechnologii(res.data[0].technologia_id)

    });
}
