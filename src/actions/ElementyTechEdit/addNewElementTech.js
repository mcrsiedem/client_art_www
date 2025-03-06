import axios from "axios";

import { IP } from "../../utils/Host";


export function addNewElementTech(row,elementyTech,setElementyTech) {

 // row = row Element Tech
// dodaje element Tech

elementyTech.push({
  ...row,
  id: generateMaxID(elementyTech),
  indeks: generateMaxIndeks(elementyTech),
  insert: true
});

  setElementyTech(elementyTech);


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