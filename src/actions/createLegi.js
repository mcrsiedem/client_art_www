import axios from "axios";

import { IP } from "../utils/Host";


export function createLegi(row,legi,setLegi) {

  const typ_legi = 16;

  const new_legi = []

  const ilosc_leg = row.ilosc_stron / 16;

  for (let i = 0; i < ilosc_leg; i++) {
    new_legi.push({indeks:i+1,rodzaj_elementu:row.typ,typ_legi,naklad:row.naklad})
  }

  setLegi(new_legi)
  // setLegi([{indeks:1,typ:1},{indeks:2,typ:1},{indeks:1,typ:1}])
// dodaje nowy koszt i dodaje pusty wpis do bazy, aby zwiększyć id


      // kosztyEdit.sort((a, b) => a.indeks - b.indeks);
      // setKosztyDodatkoweTemporary(kosztyEdit);
  // console.log(legi[0].indeks)
}


const generateMaxID = (kosztyDodatkoweTemporary) => {
  let maxID = null;
  if(kosztyDodatkoweTemporary.length == 0) return maxID =1
   maxID = Math.max(...kosztyDodatkoweTemporary.map((f) => f.id)) + 1

  return maxID;
}

const generateMaxIndeks= (kosztyDodatkoweTemporary) => {
  let maxIndeks = null;
  if(kosztyDodatkoweTemporary.length == 0) return maxIndeks = 1
   maxIndeks = Math.max(...kosztyDodatkoweTemporary.map((f) => f.indeks)) + 1

  return maxIndeks;
}