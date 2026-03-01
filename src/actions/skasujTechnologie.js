import axios from "axios";

import { IP } from "../utils/Host";

export function skasujTechnologie(
  technologia_id,
  zamowienie_id,
  user_id,
  refreshZamowienia,
  setShowTechnologyStage,
) {
  axios
    .get(
      IP +
        "skasujTechnologie/" +
        technologia_id +
        "/" +
        zamowienie_id +
        "/" +
        user_id +
        "/" +
        sessionStorage.getItem("token"),
    )
    .then((res) => {
      setShowTechnologyStage(false);
      refreshZamowienia();
    });
}
