import axios from "axios";

import { IP } from "../utils/Host";


export function dragDropProcesGrupa(id_drag_grupa_proces,id_drop_grupa_proces,grupyWykonanAll,setGrupWykonanAll) {



  axios
  .delete(IP + "drag_drop_proces_grupa", { id_drag_grupa_proces,id_drop_grupa_proces})
    .then((res) => {

      setGrupWykonanAll([...res.data])
    // console.log(res.status)
    // setZamowienia( zamowienia.filter(x => x.select !== true))
    // setShowMenu(false)


    });
}
