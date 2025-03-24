import axios from "axios";

import { IP } from "../utils/Host";
import DecodeToken from "pages/Login/DecodeToken";


export function addHistoria(row,historiaZamowienia, setHistoriaZamowienia) {

const new_historia = historiaZamowienia.slice();

new_historia.push({...row, user_id: DecodeToken(sessionStorage.getItem("token")).id,insert:true})

      setHistoriaZamowienia(new_historia)
}
