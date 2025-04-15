import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { findNadkomplet } from "actions/findNadkomplet";


export function createArk_16_K_modulo_8ka(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety) {


  let nr_arkusza = 0;
  let nr_legi = 0;





//--------------//--------------
nr_arkusza++
    new_arkusze.push({
      id: getMaxID(new_arkusze),
      indeks: getMaxIndeks(new_arkusze),
      ...ark,
      nr_arkusza,
      rodzaj_arkusza: 8,
      ilosc_leg: lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu,
      naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu)),
      nadkomplet: findNadkomplet(nadkomplety, ark.naklad / (lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu) )
    });

    for (let a = 0; a < ilosc_leg_na_arkuszu; a++) {
      // do każdego ark dodaje odpowiednią ilość leg
      nr_legi++
      new_legi.push({
        id: getMaxID(new_legi),
        indeks: getMaxIndeks(new_legi),
        ...lega,
        nr_legi,
        rodzaj_legi:8,
        arkusz_id: getMaxID(new_arkusze)-1,
        naklad: Math.ceil( ark.naklad / (lega.rodzaj_legi / 8 * ilosc_leg_na_arkuszu) *2)
      });
    }
  }