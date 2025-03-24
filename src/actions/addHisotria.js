import axios from "axios";

import { IP } from "../utils/Host";


export function addHistoria(row,historiaZamowienia, setHistoriaZamowienia) {

const new_historia = historiaZamowienia.slice();

new_historia.push({...row, insert:true})

      setHistoriaZamowienia(new_historia)
}
