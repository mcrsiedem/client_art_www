import axios from "axios";

import { IP } from "../utils/Host";

export function getZamowieniaInfoGrupy(grupy) {
  axios
    .put(IP + "zamowieniaInfoGrupy/" + sessionStorage.getItem("token"), grupy)
    .then((res) => {
      console.log(res.data);
      alert(
        "Suma przelotów: " + res.data.suma_przelotow.toLocaleString() + " ark.",
      );
    });
}
