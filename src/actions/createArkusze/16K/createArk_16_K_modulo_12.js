import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";

import { findNadkomplet } from "actions/findNadkomplet";

export function createArk_16_K_modulo_12(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety,row) {


  let nr_arkusza = 0;
  let nr_legi = 0;

for (let i = 0; i < ilosc_arkuszy - 2; i++) {
  nr_arkusza++
  const maxid = getMaxID(new_arkusze);
  new_arkusze.push({
    id: maxid,
    indeks: getMaxIndeks(new_arkusze.filter(x=> x.element_id == row.id)),
    ...ark, nr_arkusza,
    ilosc_leg: ilosc_leg_na_arkuszu,
    nadkomplet: findNadkomplet(nadkomplety,ark.naklad), 
  });
  for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
    nr_legi++
    // do każdego ark dodaje odpowiednią ilość leg
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi),
      ...lega, nr_legi,
      arkusz_id: maxid,
    });
  }

}
nr_arkusza++
new_arkusze.push({
  id: getMaxID(new_arkusze),
  indeks: getMaxIndeks(new_arkusze.filter(x=> x.element_id == row.id)),
  ...ark,nr_arkusza,
  rodzaj_arkusza: 4,
  ilosc_leg: lega.rodzaj_legi / 4 * ilosc_leg_na_arkuszu,
  naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 4 * ilosc_leg_na_arkuszu)),
  nadkomplet: findNadkomplet(nadkomplety,ark.naklad / (lega.rodzaj_legi / 4 * ilosc_leg_na_arkuszu)), 
  
});

for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
  // do każdego ark dodaje odpowiednią ilość leg
  nr_legi++
  new_legi.push({
    id: getMaxID(new_legi),
    indeks: getMaxIndeks(new_legi),
    ...lega,nr_legi,
    rodzaj_legi: 4,
    arkusz_id: getMaxID(new_arkusze)-1,
    naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 4 * ilosc_leg_na_arkuszu) * 4)
    
  });
}


   //--------------//--------------
   nr_arkusza++
   new_arkusze.push({
    id: getMaxID(new_arkusze),
    indeks: getMaxIndeks(new_arkusze.filter(x=> x.element_id == row.id)),
    ...ark,nr_arkusza,
    rodzaj_arkusza: 8,
    ilosc_leg: lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu,
    naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu)),
    nadkomplet: findNadkomplet(nadkomplety,ark.naklad / (lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu)),
   
    
  });

  for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
    // do każdego ark dodaje odpowiednią ilość leg
    nr_legi++
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi),
      ...lega,nr_legi,
      rodzaj_legi: 8,
      arkusz_id: getMaxID(new_arkusze)-1,
      naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu) * 2)
    });
  }
//--------------
nr_arkusza++
new_arkusze.push({
id: getMaxID(new_arkusze),
indeks: getMaxIndeks(new_arkusze.filter(x=> x.element_id == row.id)),
...ark,nr_arkusza,
rodzaj_arkusza: 16,
ilosc_leg: ilosc_leg_na_arkuszu,
nadkomplet: findNadkomplet(nadkomplety,ark.naklad), 
});

for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
// do każdego ark dodaje odpowiednią ilość leg
nr_legi++
new_legi.push({
  id: getMaxID(new_legi),
  indeks: getMaxIndeks(new_legi),
  ...lega,nr_legi,
  arkusz_id: getMaxID(new_arkusze)-1,
});
}


}