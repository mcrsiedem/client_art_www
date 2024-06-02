import axios from "axios";

import { IP } from "../utils/Host";


export function createArkusze(row,arkusze,setArkusze) {

  const typ_arkusza = 16;

  const new_arkusze = []

  const ilosc_arkuszy = row.ilosc_stron / 16;

  for (let i = 0; i < ilosc_arkuszy; i++) {
    new_arkusze.push({id:i+1,indeks:i+1,rodzaj_elementu:row.typ,typ_arkusza,naklad:row.naklad,element_id:row.id,ilosc_stron:row.ilosc_stron})
  }

  setArkusze(new_arkusze)

  console.log(ilosc_arkuszy)
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