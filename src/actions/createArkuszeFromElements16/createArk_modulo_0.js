import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { findNadkomplet } from "actions/findNadkomplet";


export function createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety) {


  for (let i = 0; i < ilosc_arkuszy; i++) {
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

}

