import axios from "axios";

import { IP } from "../utils/Host";


export function createLegi(row,legi,setLegi) {

  const typ_legi = 16;

  const new_legi = []
  // const new_legi = legi.slice();

  const ilosc_leg = row.ilosc_stron / 16;

  for (let i = 0; i < ilosc_leg; i++) {
    new_legi.push({id:i+1,indeks:i+1,rodzaj_elementu:row.typ,typ_legi,naklad:row.naklad,element_id:row.id,ilosc_stron:row.ilosc_stron})
  }

  setLegi(new_legi)


}

