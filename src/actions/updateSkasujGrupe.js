import axios from "axios";

import { IP } from "../utils/Host";

export function updateSkasujGrupe(
  global_id_grupa,
  fechparametryTechnologii,
  zamowienie_id,
  technologia_id,
) {
  axios
    .get(
      IP +
        "skasujGrupe/" +
        global_id_grupa +
        "/" +
        sessionStorage.getItem("token"),
    )
    .then((res) => {
      fechparametryTechnologii(zamowienie_id, technologia_id);
    });
}
