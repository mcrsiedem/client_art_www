import axios from "axios";

import { IP } from "../utils/Host";


export function dragDropProcesGrupa(id_drag_grupa_proces,id_drop_grupa_proces) {


  
  axios
  .post(IP + "drag_drop_proces_grupa/"+id_drag_grupa_proces+"/"+id_drop_grupa_proces)
    .then((res) => {
      console.log("oooo")
      // setGrupWykonanAll([...res.data])
    console.log(res.data)
    // fechGrupyAndWykonaniaForProcesor(1)
    // setZamowienia( zamowienia.filter(x => x.select !== true))
    // setShowMenu(false)


    });
}
