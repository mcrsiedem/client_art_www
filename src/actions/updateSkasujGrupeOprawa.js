import axios from "axios";

import { IP } from "../utils/Host";


export function updateSkasujGrupeOprawa(global_id_grupa,fechparametryTechnologii,zamowienie_id,technologia_id) {

// id = procesor id

  axios.get(IP + "skasujGrupeOprawa/"+global_id_grupa+"/"+ sessionStorage.getItem("token"))
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    // fechparametryTechnologii
    // fechparametryTechnologii(zamowienie_id,res.data[0].technologia_id)
    // console.log("zamowienie id:" +zamowienie_id)
    // console.log("technologia id:" +technologia_id)
    fechparametryTechnologii(zamowienie_id,technologia_id)

    });
}
// const res = await axios.get(IP + "technologie_parametry/"+technologia_id+"/"+ sessionStorage.getItem("token"));
