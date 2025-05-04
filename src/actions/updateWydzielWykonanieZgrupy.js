import axios from "axios";

import { IP } from "../utils/Host";


export function updateWydzielWykonanieZgrupy(global_id_wykonania,fechparametryTechnologii,zamowienie_id) {

// id = procesor id

  axios.get(IP + "updateWydzielWykonanieZgrupy/"+global_id_wykonania)
    .then((res) => {
    console.log("technologia_id " +res.data[0].technologia_id)
    // fechparametryTechnologii

    
    fechparametryTechnologii(zamowienie_id,res.data[0].technologia_id)

    });
}
