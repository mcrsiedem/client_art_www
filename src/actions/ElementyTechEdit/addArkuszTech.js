import axios from "axios";

import { IP } from "../../utils/Host";


export function addArkuszTech(row,arkusze,setArkusze,legi, setLegi,legiFragmenty, setLegiFragmenty) {

 // row = row Element Tech
// dodaje nowy koszt i dodaje pusty wpis do bazy, aby zwiększyć id


// const lega = {
//   typ_elementu: row.typ,
//   rodzaj_legi,
//   element_id: row.id,
//   ilosc_stron: row.ilosc_stron,
//   naklad: row.naklad,
// };

// const legaFragment = {

//   wersja:"fr",
//   element_id: row.id,
//   naklad: row.naklad,
// };
let arkusz_id = generateMaxID(arkusze);
let lega_id = generateMaxID(legi);

arkusze.push({
  id: arkusz_id,
  indeks: generateMaxIndeks(arkusze),
  typ_elementu: row.typ,
  rodzaj_arkusza: null,
  naklad: row.naklad,
  element_id: row.id,
  ilosc_stron: row.ilosc_stron,
  ilosc_leg: null,
  uwagi:"",
  technolologia_id: row.technologia_id
  // ilosc_leg: rodzaj_arkusza/ 4
});

legi.push({
  id:  lega_id,
  indeks: generateMaxIndeks(legi),
  typ_elementu: row.typ,
  rodzaj_legi:null,
  element_id: row.id,
  ilosc_stron: row.ilosc_stron,
  naklad: row.naklad,
  arkusz_id: arkusz_id,
});

legiFragmenty.push({
  id: generateMaxID(legiFragmenty),
  indeks: generateMaxIndeks(legiFragmenty),
  wersja:"fr",
  element_id: row.id,
  lega_id: lega_id,
  naklad: row.naklad,
  arkusz_id: arkusz_id,
  technologia_id: row.technologia_id

});


// ok
      // kosztyEdit.sort((a, b) => a.indeks - b.indeks);



      setArkusze(arkusze);
      setLegi(legi)
      setLegiFragmenty(legiFragmenty)
  // console.log(row.id)
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