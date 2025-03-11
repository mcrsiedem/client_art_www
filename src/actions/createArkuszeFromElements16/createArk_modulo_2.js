import { findNadkomplet } from "actions/findNadkomplet";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";



export function createArk_modulo_2(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety) {



for (let i = 0; i < ilosc_arkuszy - 2; i++) {
  const maxid = getMaxID(new_arkusze);
  new_arkusze.push({
    id: maxid,
    indeks: getMaxIndeks(new_arkusze),
    ...ark,
    ilosc_leg: ilosc_leg_na_arkuszu,
    nadkomplet: findNadkomplet(nadkomplety,ark.naklad) 
  });
  for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
    // do każdego ark dodaje odpowiednią ilość leg
    new_legi.push({
      id: getMaxID(new_legi),
      indeks: getMaxIndeks(new_legi),
      ...lega,
      arkusz_id: maxid,
    });
  }

}

    new_arkusze.push({
      id: getMaxID(new_arkusze),
      indeks: getMaxIndeks(new_arkusze),
      ...ark,
      rodzaj_arkusza: 2,
      ilosc_leg: lega.rodzaj_legi / 2 * ilosc_leg_na_arkuszu,
      naklad: ark.naklad / (lega.rodzaj_legi / 2 * ilosc_leg_na_arkuszu),
      nadkomplet: findNadkomplet(nadkomplety,ark.naklad / (lega.rodzaj_legi / 2 * ilosc_leg_na_arkuszu) )
    });

    for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
      // do każdego ark dodaje odpowiednią ilość leg
      new_legi.push({
        id: getMaxID(new_legi),
        indeks: getMaxIndeks(new_legi),
        ...lega,
        arkusz_id: getMaxID(new_arkusze)-1,
        naklad: ark.naklad / (lega.rodzaj_legi / 2 * ilosc_leg_na_arkuszu)
      });
    }


new_arkusze.push({
  id: getMaxID(new_arkusze),
  indeks: getMaxIndeks(new_arkusze),
  ...ark,
  rodzaj_arkusza: 16,
  ilosc_leg: ilosc_leg_na_arkuszu,
  nadkomplet: findNadkomplet(nadkomplety,ark.naklad) 
  
});

for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
  // do każdego ark dodaje odpowiednią ilość leg
  new_legi.push({
    id: getMaxID(new_legi),
    indeks: getMaxIndeks(new_legi),
    ...lega,
    arkusz_id: getMaxID(new_arkusze)-1,
  });
}


}



