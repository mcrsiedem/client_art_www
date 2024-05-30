import axios from "axios";

import { IP } from "../utils/Host";


export function addArkusze(strony,arkusze,setArkusze) {

// dodaje nowy koszt i dodaje pusty wpis do bazy, aby zwiększyć id


      // kosztyEdit.sort((a, b) => a.indeks - b.indeks);
      // setKosztyDodatkoweTemporary(kosztyEdit);
  console.log(strony)
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