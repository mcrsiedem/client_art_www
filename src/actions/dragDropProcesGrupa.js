import axios from "axios";

import { IP } from "../utils/Host";


export function dragDropProcesGrupa(id_drag_grupa_proces,id_drop_grupa_proces,fechGrupyAndWykonaniaForProcesor) {


  
  axios
  .get(IP + "drag_drop_proces_grupa/"+id_drag_grupa_proces+"/"+id_drop_grupa_proces)
    .then((res) => {
   
      // setGrupWykonanAll([...res.data])
    console.log(res.data[0].mcr)
    fechGrupyAndWykonaniaForProcesor(res.data[0].mcr)
    // setZamowienia( zamowienia.filter(x => x.select !== true))
    // setShowMenu(false)


    });
}
