import axios from "axios";

import { IP } from "../utils/Host";


export function dragDropProcesGrupaToProcesor(id_drag_grupa_proces,id,fechGrupyAndWykonaniaForProcesor) {

// id = procesor id
  
  axios
  .get(IP + "drag_drop_proces_grupa_to_procesor/"+id_drag_grupa_proces+"/"+id)
    .then((res) => {
    // console.log("procesor " +res.data[0].mcr)
    fechGrupyAndWykonaniaForProcesor(res.data[0].procesor_id)

    });
}
