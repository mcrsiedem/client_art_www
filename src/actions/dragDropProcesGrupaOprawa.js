import axios from "axios";

import { IP } from "../utils/Host";


export function dragDropProcesGrupaOprawa(id_drag_grupa_proces,id_drop_grupa_proces,fechGrupyOprawaForProcesor) {


  
  axios
  .get(IP + "drag_drop_proces_grupa_oprawa/"+id_drag_grupa_proces+"/"+id_drop_grupa_proces)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    fechGrupyOprawaForProcesor(res.data[0].procesor_id)

    });
}
