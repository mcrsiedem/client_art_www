import axios from "axios";

import { IP } from "../../utils/Host";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";


export function addNewArkuszTech(row,arkusze,setArkusze,legi, setLegi,legiFragmenty, setLegiFragmenty) {

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
let arkusz_id = getMaxID(arkusze);
let lega_id = getMaxID(legi);

arkusze.push({
  id: arkusz_id,
  indeks: getMaxIndeks(arkusze),
  typ_elementu: row.typ,
  rodzaj_arkusza: row.lega,
  naklad: row.naklad,
  element_id: row.id,
  ilosc_stron: row.ilosc_stron,
  ilosc_leg: 1,
  papier_id: row.papier_id,
  nadkomplet: "",
  nr_arkusza: "",
  arkusz_szerokosc: "",
  arkusz_wysokosc: "",
  uwagi:"",
  technologia_id: row.technologia_id,
  insert: true
  // ilosc_leg: rodzaj_arkusza/ 4
});

legi.push({
  id:  lega_id,
  indeks: getMaxIndeks(legi),
  typ_elementu: row.typ,
  rodzaj_legi:row.lega,
  element_id: row.id,
  ilosc_stron: row.ilosc_stron,
  naklad: row.naklad,
  arkusz_id: arkusz_id,
  technologia_id: row.technologia_id,
  nr_legi: "",
  uwagi:"",
  insert: true
});

legiFragmenty.push({
  id: getMaxID(legiFragmenty),
  indeks: getMaxIndeks(legiFragmenty),
  wersja:"",
  nr_legi: "",
  element_id: row.id,
  lega_id: lega_id,
  naklad: row.naklad,
  arkusz_id: arkusz_id,
  technologia_id: row.technologia_id,
  oprawa_id: null,
  typ: row.typ,
  insert: true

});


// ok
      // kosztyEdit.sort((a, b) => a.indeks - b.indeks);



      setArkusze(arkusze);
      setLegi(legi)
      setLegiFragmenty(legiFragmenty)
  // console.log(row.id)
}

