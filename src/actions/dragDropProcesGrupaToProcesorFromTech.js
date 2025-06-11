import axios from "axios";

import { IP } from "../utils/Host";

// zmiana procesora w grupie z poziomu technologia stage
export function dragDropProcesGrupaToProcesorFromTech(id_drag_grupa_proces,id,fechparametryTechnologii,zamowienie_id,technologia_id) {

// id = procesor id
  
  axios
  .get(IP + "drag_drop_proces_grupa_to_procesor/"+id_drag_grupa_proces+"/"+id)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    fechparametryTechnologii(zamowienie_id,technologia_id)

    });
}
