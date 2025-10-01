import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const dragdropProcesGrupaMulti= async (fechGrupyAndWykonaniaForProcesor,selectedProcesor,drop_global_id,multiSelect,setMultiSelect
) => {
  let status, insertId,status_grupy,zrealizowano;
  await axios
    .put(IP + "drag_drop_proces_grupa_multi/" + sessionStorage.getItem("token"), [multiSelect,drop_global_id])
    .then((res) => {
fechGrupyAndWykonaniaForProcesor(selectedProcesor)
setMultiSelect([])
    });
};
      //   grupyWykonanAll.filter((x) => x.select ==true ).flatMap(stage =>stage.global_id),
//