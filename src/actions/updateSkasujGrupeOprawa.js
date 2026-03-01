import axios from "axios";

import { IP } from "../utils/Host";

export function updateSkasujGrupeOprawa(
  global_id_grupa,
  fechparametryTechnologii,
  zamowienie_id,
  technologia_id,
) {
  axios
    .get(
      IP +
        "skasujGrupeOprawa/" +
        global_id_grupa +
        "/" +
        sessionStorage.getItem("token"),
    )
    .then((res) => {
      fechparametryTechnologii(zamowienie_id, technologia_id);
    });
}
